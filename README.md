# Toggl Track API Integration

## Introduction
This project provides a set of tools to interact with the Toggl Track API. It allows users to manage their time tracking activities, including creating organizations, workspaces, projects, tasks, and time entries.

## Features
- Retrieve user information.
- Create and manage organizations and workspaces.
- Add and manage projects within workspaces.
- Create tasks and track time for those tasks.

## Setup
### Prerequisites
- Node.js
- npm or Yarn

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/adanzweig/nodejs-toggl.git
   ```
2. Navigate to the project directory:
   ```
   cd nodejs-toggl
   ```
3. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Environment Configuration
Create a `.env` file in the root directory and add your Toggl Track API token:
```
API_TOKEN=your_api_token_here
```

## Usage
The project includes several asynchronous functions to interact with the Toggl Track API. Below is an example of how to use these functions:

1. Fetch and display user information:
   ```javascript
   const userInfo = await getMe();
   console.log(userInfo);
   ```

2. Create a new organization:
   ```javascript
   const newOrg = await createOrganization('OrganizationName', 'WorkspaceName');
   console.log(newOrg);
   ```

3. Add a task to a project:
   ```javascript
   const newTask = await addTaskToProject(workspace_id, project_id, 'TaskName', estimated_seconds);
   console.log(newTask);
   ```

