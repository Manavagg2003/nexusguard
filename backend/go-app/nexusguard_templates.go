package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	shuffle "github.com/shuffle/shuffle-shared"
)

// seedNexusGuardTemplates inserts the 3 NexusGuard branded playbook templates
// into the database on startup (if they don't already exist).
// Call this as a goroutine from main() so it doesn't block startup.
func seedNexusGuardTemplates() {
	// Give the database a moment to become ready
	time.Sleep(15 * time.Second)

	ctx := context.Background()

	templates := buildNexusGuardTemplates()
	for _, wf := range templates {
		existing, err := shuffle.GetWorkflow(ctx, wf.ID)
		if err == nil && existing != nil && existing.ID == wf.ID {
			log.Printf("[NexusGuard] Template '%s' already exists — skipping.", wf.Name)
			continue
		}

		err = shuffle.SetWorkflow(ctx, wf, wf.ID)
		if err != nil {
			log.Printf("[NexusGuard] Failed seeding template '%s': %s", wf.Name, err)
		} else {
			log.Printf("[NexusGuard] Successfully seeded template '%s' (%s)", wf.Name, wf.ID)
		}
	}
}

// buildNexusGuardTemplates returns the 3 NexusGuard branded template workflows.
func buildNexusGuardTemplates() []shuffle.Workflow {
	now := time.Now().Unix()

	// ─── Template 1: Phishing Triage ─────────────────────────────────────────
	triggerPhish := shuffle.Trigger{
		TriggerType: "WEBHOOK",
		ID:          "ng-phish-trigger-01",
		Label:       "Email Alert Received",
		Name:        "Webhook",
		Status:      "uninitialized",
	}
	phishActions := []shuffle.Action{
		{
			ID:          "ng-phish-act-01",
			Name:        "extract_sender_ip",
			Label:       "Extract Sender IP",
			AppName:     "Shuffle Tools",
			AppVersion:  "1.2.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
		{
			ID:          "ng-phish-act-02",
			Name:        "get_ip_report",
			Label:       "Enrich IP (VirusTotal)",
			AppName:     "VirusTotal",
			AppVersion:  "3.0.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
		{
			ID:          "ng-phish-act-03",
			Name:        "block_ip",
			Label:       "Block Malicious IP",
			AppName:     "Firewall",
			AppVersion:  "1.0.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
	}
	phishBranches := []shuffle.Branch{
		{ID: "ng-phish-br-01", SourceID: "ng-phish-trigger-01", DestinationID: "ng-phish-act-01"},
		{ID: "ng-phish-br-02", SourceID: "ng-phish-act-01", DestinationID: "ng-phish-act-02"},
		{ID: "ng-phish-br-03", SourceID: "ng-phish-act-02", DestinationID: "ng-phish-act-03"},
	}
	phishWorkflow := shuffle.Workflow{
		ID:          "ng-template-phishing-triage-001",
		Name:        "NexusGuard: Phishing Triage",
		Description: "Triggered by an email alert. Automatically extracts the sender IP, enriches it via VirusTotal, and blocks it if flagged as malicious. A NexusGuard branded security automation template.",
		Tags:        []string{"nexusguard-template", "phishing", "email", "triage"},
		Sharing:     "public",
		Status:      "production",
		Created:     now,
		Edited:      now,
		Actions:     phishActions,
		Triggers:    []shuffle.Trigger{triggerPhish},
		Branches:    phishBranches,
		PreviouslySaved: true,
	}

	// ─── Template 2: Brute Force Response ────────────────────────────────────
	triggerBrute := shuffle.Trigger{
		TriggerType: "WEBHOOK",
		ID:          "ng-brute-trigger-01",
		Label:       "Failed Login Threshold Alert",
		Name:        "Webhook",
		Status:      "uninitialized",
	}
	bruteActions := []shuffle.Action{
		{
			ID:          "ng-brute-act-01",
			Name:        "parse_alert",
			Label:       "Parse Login Alert",
			AppName:     "Shuffle Tools",
			AppVersion:  "1.2.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
		{
			ID:          "ng-brute-act-02",
			Name:        "block_ip",
			Label:       "Auto-Block Offending IP",
			AppName:     "Firewall",
			AppVersion:  "1.0.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
		{
			ID:          "ng-brute-act-03",
			Name:        "send_message",
			Label:       "Notify Slack Channel",
			AppName:     "Slack",
			AppVersion:  "1.4.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
	}
	bruteBranches := []shuffle.Branch{
		{ID: "ng-brute-br-01", SourceID: "ng-brute-trigger-01", DestinationID: "ng-brute-act-01"},
		{ID: "ng-brute-br-02", SourceID: "ng-brute-act-01", DestinationID: "ng-brute-act-02"},
		{ID: "ng-brute-br-03", SourceID: "ng-brute-act-02", DestinationID: "ng-brute-act-03"},
	}
	bruteWorkflow := shuffle.Workflow{
		ID:          "ng-template-bruteforce-002",
		Name:        "NexusGuard: Brute Force Response",
		Description: "Triggered when a SIEM alert fires on failed login thresholds. Automatically blocks the offending IP address and sends a Slack notification to the security team. A NexusGuard branded security automation template.",
		Tags:        []string{"nexusguard-template", "bruteforce", "authentication", "siem", "slack"},
		Sharing:     "public",
		Status:      "production",
		Created:     now,
		Edited:      now,
		Actions:     bruteActions,
		Triggers:    []shuffle.Trigger{triggerBrute},
		Branches:    bruteBranches,
		PreviouslySaved: true,
	}

	// ─── Template 3: Malware Isolation ────────────────────────────────────────
	triggerMalware := shuffle.Trigger{
		TriggerType: "WEBHOOK",
		ID:          "ng-malware-trigger-01",
		Label:       "EDR Malware Alert",
		Name:        "Webhook",
		Status:      "uninitialized",
	}
	malwareActions := []shuffle.Action{
		{
			ID:          "ng-malware-act-01",
			Name:        "parse_edr_alert",
			Label:       "Parse EDR Alert",
			AppName:     "Shuffle Tools",
			AppVersion:  "1.2.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
		{
			ID:          "ng-malware-act-02",
			Name:        "isolate_host",
			Label:       "Isolate Endpoint via EDR",
			AppName:     "CrowdStrike",
			AppVersion:  "2.0.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
		{
			ID:          "ng-malware-act-03",
			Name:        "create_issue",
			Label:       "Create Jira Incident Ticket",
			AppName:     "Jira",
			AppVersion:  "1.3.0",
			IsStartNode: false,
			Environment: "NexusGuard",
		},
	}
	malwareBranches := []shuffle.Branch{
		{ID: "ng-malware-br-01", SourceID: "ng-malware-trigger-01", DestinationID: "ng-malware-act-01"},
		{ID: "ng-malware-br-02", SourceID: "ng-malware-act-01", DestinationID: "ng-malware-act-02"},
		{ID: "ng-malware-br-03", SourceID: "ng-malware-act-02", DestinationID: "ng-malware-act-03"},
	}
	malwareWorkflow := shuffle.Workflow{
		ID:          "ng-template-malware-isolation-003",
		Name:        "NexusGuard: Malware Isolation",
		Description: "Triggered by an EDR alert for detected malware. Automatically isolates the affected endpoint, then creates a Jira incident ticket for the SOC team to track remediation. A NexusGuard branded security automation template.",
		Tags:        []string{"nexusguard-template", "malware", "edr", "isolation", "incident"},
		Sharing:     "public",
		Status:      "production",
		Created:     now,
		Edited:      now,
		Actions:     malwareActions,
		Triggers:    []shuffle.Trigger{triggerMalware},
		Branches:    malwareBranches,
		PreviouslySaved: true,
	}

	return []shuffle.Workflow{phishWorkflow, bruteWorkflow, malwareWorkflow}
}

// handleNexusGuardSummarize handles POST /api/v1/nexusguard/summarize
// It accepts a list of alerts and returns an AI-generated triage summary.
func handleNexusGuardSummarize(resp http.ResponseWriter, request *http.Request) {
	cors := shuffle.HandleCors(resp, request)
	if cors {
		return
	}

	user, err := shuffle.HandleApiAuthentication(resp, request)
	if err != nil {
		log.Printf("[NexusGuard] Auth failed in summarize: %s", err)
		resp.WriteHeader(401)
		resp.Write([]byte(`{"success": false, "reason": "Authentication required"}`))
		return
	}
	_ = user

	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		resp.WriteHeader(400)
		resp.Write([]byte(`{"success": false, "reason": "Failed to read request body"}`))
		return
	}

	// Parse alerts array
	var payload struct {
		Alerts []map[string]interface{} `json:"alerts"`
	}
	if jsonErr := json.Unmarshal(body, &payload); jsonErr != nil {
		// Also accept a raw array
		var rawAlerts []map[string]interface{}
		if jsonErr2 := json.Unmarshal(body, &rawAlerts); jsonErr2 == nil {
			payload.Alerts = rawAlerts
		}
	}

	alertCount := len(payload.Alerts)
	summary := generateAlertSummary(payload.Alerts)

	log.Printf("[NexusGuard] Summarize request from %s: %d alerts", user.Username, alertCount)

	resp.Header().Set("Content-Type", "application/json")
	resp.WriteHeader(200)
	resp.Write([]byte(fmt.Sprintf(`{"success": true, "summary": %s, "alert_count": %d}`,
		mustMarshal(summary), alertCount)))
}

// generateAlertSummary produces a structured triage summary from alerts.
// In production you would call an LLM API here.
func generateAlertSummary(alerts []map[string]interface{}) string {
	if len(alerts) == 0 {
		return "No alerts provided for analysis. Submit alerts to generate a triage summary."
	}

	sevCounts := map[string]int{"critical": 0, "high": 0, "medium": 0, "low": 0, "unknown": 0}
	for _, alert := range alerts {
		sev := strings.ToLower(fmt.Sprintf("%v", alert["severity"]))
		if _, ok := sevCounts[sev]; ok {
			sevCounts[sev]++
		} else {
			sevCounts["unknown"]++
		}
	}

	lines := []string{
		fmt.Sprintf("NexusGuard AI Triage Summary — %d alert(s) analyzed", len(alerts)),
		"",
		fmt.Sprintf("• Critical: %d  |  High: %d  |  Medium: %d  |  Low: %d  |  Unknown: %d",
			sevCounts["critical"], sevCounts["high"], sevCounts["medium"], sevCounts["low"], sevCounts["unknown"]),
		"",
	}

	if sevCounts["critical"] > 0 || sevCounts["high"] > 0 {
		lines = append(lines, "⚠️  Immediate action recommended: critical and/or high severity alerts detected.")
		lines = append(lines, "   → Review and triage these alerts using the Phishing Triage or Brute Force Response playbooks.")
	} else {
		lines = append(lines, "✅  No critical or high severity alerts. Continue routine monitoring.")
	}

	lines = append(lines, "", "Recommended next steps:")
	lines = append(lines, "  1. Validate alert sources and remove duplicates.")
	lines = append(lines, "  2. Assign critical/high alerts to on-call analysts.")
	lines = append(lines, "  3. Run relevant NexusGuard automation playbooks.")

	return strings.Join(lines, "\n")
}

func mustMarshal(s string) string {
	b, err := json.Marshal(s)
	if err != nil {
		return `"Error generating summary"`
	}
	return string(b)
}

// nexusGuardResponseWriter wraps http.ResponseWriter to inject NexusGuard
// branding headers immediately before the HTTP status code is written.
// This ensures the headers appear on every response regardless of what
// upstream middleware or handlers do to the header map beforehand.
type nexusGuardResponseWriter struct {
	http.ResponseWriter
	headerWritten bool
}

func (nw *nexusGuardResponseWriter) WriteHeader(code int) {
	if !nw.headerWritten {
		nw.headerWritten = true
		// Remove any framework-revealing headers
		nw.ResponseWriter.Header().Del("Server")
		nw.ResponseWriter.Header().Del("X-Runtime")
		nw.ResponseWriter.Header().Del("X-Framework")
		// Overwrite / set NexusGuard brand headers
		nw.ResponseWriter.Header().Set("X-Powered-By", "NexusGuard")
		nw.ResponseWriter.Header().Set("X-Platform", "NexusGuard Security Automation")
	}
	nw.ResponseWriter.WriteHeader(code)
}

func (nw *nexusGuardResponseWriter) Write(b []byte) (int, error) {
	if !nw.headerWritten {
		// Implicit 200 — WriteHeader was never called explicitly
		nw.WriteHeader(http.StatusOK)
	}
	return nw.ResponseWriter.Write(b)
}

// nexusGuardHeaderMiddleware is a gorilla/mux compatible middleware that
// ensures every API response carries the NexusGuard branding headers and
// does not expose the underlying Go/Shuffle framework details.
func nexusGuardHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		wrapped := &nexusGuardResponseWriter{ResponseWriter: w}
		next.ServeHTTP(wrapped, r)
	})
}
