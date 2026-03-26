<h1 align="center">

[![NexusGuard Logo](./frontend/public/images/logo.png)](#)

NexusGuard Security Automation

</h1><h4 align="center">

NexusGuard is an open-source, dashboard-centric security automation platform designed for security professionals and SOC teams. Built to streamline security operations, it provides an intuitive interface, robust workflows, and comprehensive integrations.

[_Documentation_](#documentation) — [_Getting Started_](#getting-started) — [_Features_](#key-features) — [_Development_](#contributing)

</h4>

## Overview
NexusGuard transforms complex security tasks into streamlined, automated workflows. Whether you are managing an internal SOC or operating as an MSSP, NexusGuard provides the tools you need to build, monitor, and execute security playbooks efficiently.

## Key Features
* **Modern Dashboard Interface**: A sleek, intuitive, and responsive dashboard designed for high-visibility security operations.
* **Workflow Automation**: Build powerful security playbooks using a robust workflow editor.
* **Extensive Integrations**: Connect seamlessly with your existing security stack including EDR, SIEM, and communication platforms.
* **Role-Based Access Control**: Manage organizations, sub-organizations, and user permissions effectively.
* **Real-time Execution Tracking**: Monitor the execution of playbooks and respond to alerts in real-time.

## Getting Started

### Prerequisites
- Docker & Docker Compose (for containerized deployment)
- Node.js & npm (for local frontend development)
- Go (for local backend development)

### Setting up a local development environment

To spin up the NexusGuard frontend locally:
```bash
cd frontend
npm install
npm start
```
The application will be available at `http://localhost:3000`.

For backend and full-stack setup, please refer to the detailed installation guides in the docs.

## Documentation
Comprehensive documentation covering deployment, app creation, and API reference will be continually updated.

## Repository Overview
Below is the core folder structure of NexusGuard:
```bash
├── README.md           # What you're reading right now
├── backend             # Contains backend related code.
│   ├── go-app          # The backend Golang webserver
│   └── app_sdk         # The SDK used for managing apps
├── frontend            # Contains frontend code (ReactJS, Material UI v5)
├── functions           # Has execution and extension resources
└ docker-compose.yml    # Used for centralized deployments
```

## Contributing
We welcome contributions to make cybersecurity automation more accessible!

Areas to contribute:
* **Frontend**: ReactJS, Material UI
* **Backend**: Golang, App SDKs
* **Content**: Workflows, App Integrations, Documentation

Please ensure all PRs follow the formatting standards and pass existing linting checks. 

## License
NexusGuard is built on open standards.
* Frontend/Workflows/Documentation: MIT
* Core Backend Engine: AGPLv3 

---
<p align="center">
  <i>Empowering Security Teams with Automated Defense</i>
</p>
