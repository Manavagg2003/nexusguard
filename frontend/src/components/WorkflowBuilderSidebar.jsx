import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { 
  Typography, 
  TextField, 
  InputAdornment, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box,
} from "@mui/material";
import { Search, ExpandMore } from "@mui/icons-material";

const CATEGORIES = ["SIEM", "Ticketing", "Communication", "Threat Intel", "EDR", "Custom"];
const MOCK_APPS = [
  { id: "splunk", name: "Splunk", category: "SIEM", color: "#65A637", description: "SIEM log analysis" },
  { id: "qradar", name: "QRadar", category: "SIEM", color: "#004B87", description: "IBM QRadar Security" },
  { id: "wazuh", name: "Wazuh", category: "SIEM", color: "#00B6E6", description: "Open source EDR & SIEM" },
  { id: "thehive", name: "TheHive", category: "Ticketing", color: "#FFC107", description: "Security incident response" },
  { id: "jira", name: "Jira", category: "Ticketing", color: "#0052CC", description: "Issue & project tracking" },
  { id: "servicenow", name: "ServiceNow", category: "Ticketing", color: "#81B5A1", description: "IT service management" },
  { id: "slack", name: "Slack", category: "Communication", color: "#4A154B", description: "Team communication" },
  { id: "email", name: "Email", category: "Communication", color: "#EA4335", description: "SMTP/IMAP email" },
  { id: "msteams", name: "MS Teams", category: "Communication", color: "#6264A7", description: "Microsoft Teams chat" },
  { id: "virustotal", name: "VirusTotal", category: "Threat Intel", color: "#1E88E5", description: "File & URL analysis" },
  { id: "abuseipdb", name: "AbuseIPDB", category: "Threat Intel", color: "#E53935", description: "IP reputation" },
  { id: "misp", name: "MISP", category: "Threat Intel", color: "#F50057", description: "Threat sharing" },
  { id: "crowdstrike", name: "CrowdStrike", category: "EDR", color: "#E02020", description: "Endpoint protection" },
  { id: "sentinelone", name: "SentinelOne", category: "EDR", color: "#7F3F98", description: "Autonomous EDR" },
  { id: "carbonblack", name: "Carbon Black", category: "EDR", color: "#2E75B6", description: "VMware Carbon Black" },
  { id: "webhook", name: "Webhook", category: "Custom", color: "#607D8B", description: "Incoming webhooks" },
  { id: "http", name: "HTTP Request", category: "Custom", color: "#3F51B5", description: "REST/GraphQL calls" },
  { id: "script", name: "Python Script", category: "Custom", color: "#FFEB3B", description: "Run custom Python" },
];

const DraggableAppNode = ({ app, theme }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${app.id}`,
    data: { app },
  });

  const getFallbackIcon = (name) => name ? name.charAt(0).toUpperCase() : "?";

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        marginBottom: "8px",
        borderRadius: "8px",
        background: theme?.palette?.surfaceColor || "#1e1e1e",
        border: `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.1)"}`,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.4 : 1,
        transition: "box-shadow 0.2s, background 0.2s",
        "&:hover": {
          background: theme?.palette?.action?.hover || "rgba(255,255,255,0.05)"
        }
      }}
    >
      <div style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        background: app.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        flexShrink: 0
      }}>
        {app.iconUrl ? (
          <img src={app.iconUrl} alt={app.name} style={{ width: "20px", height: "20px" }} />
        ) : (
          getFallbackIcon(app.name)
        )}
      </div>
      <div style={{ overflow: "hidden" }}>
        <Typography variant="body2" style={{ fontWeight: 600, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {app.name}
        </Typography>
        <Typography variant="caption" style={{ color: "rgba(255,255,255,0.6)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {app.description}
        </Typography>
      </div>
    </Box>
  );
};

const WorkflowBuilderSidebar = ({ theme }) => {
  const [search, setSearch] = useState("");

  const filteredApps = MOCK_APPS.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) || 
    app.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ 
      width: "280px", 
      height: "100%", 
      display: "flex", 
      flexDirection: "column",
      background: theme?.palette?.surfaceColor || "#1A1A2E",
      borderRight: `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.1)"}`,
      overflow: "hidden"
    }}>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" style={{ color: "white", marginBottom: "16px", fontWeight: "bold" }}>
          App Library
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: "rgba(255,255,255,0.5)" }} />
              </InputAdornment>
            ),
            style: { 
              color: "white", 
              background: theme?.palette?.inputColor || "rgba(255,255,255,0.05)",
              borderRadius: "8px",
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: theme?.palette?.primary?.main || "#FF8544" },
              "&.Mui-focused fieldset": { borderColor: theme?.palette?.primary?.main || "#FF8544" }
            }
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        {CATEGORIES.map(category => {
          const appsInCategory = filteredApps.filter(app => app.category === category);
          
          if (appsInCategory.length === 0) return null;

          return (
            <Accordion 
              key={category} 
              defaultExpanded 
              disableGutters
              elevation={0}
              style={{ background: "transparent", color: "white", "&:before": { display: "none" } }}
              sx={{
                "&:before": { display: "none" },
                borderBottom: `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.05)"}`,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore style={{ color: "white" }} />}
                style={{ padding: "0 8px", minHeight: "48px" }}
              >
                <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                  {category} ({appsInCategory.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "8px 0" }}>
                {appsInCategory.map(app => (
                  <DraggableAppNode key={`sidebar-${app.id}`} app={app} theme={theme} />
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}

        {filteredApps.length === 0 && (
          <Typography variant="body2" style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: "40px" }}>
            No apps found matching "{search}"
          </Typography>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilderSidebar;
