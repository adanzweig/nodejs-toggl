// Load environment variables from the .env file
require('dotenv').config();

// Base URL for the Toggl Track API
const apiBaseUrl = 'https://api.track.toggl.com/api/v9';

// Headers for API requests, including authorization using the API token
const headers= {
    "Authorization":`Basic ${Buffer.from(process.env.API_TOKEN+':api_token').toString('base64')}`
}

// Function to get information about the current user
async function getMe(){
    try{
        // Make a GET request to the Toggl Track API to retrieve user information
        const request = await fetch(`${apiBaseUrl}/me`,{headers});
        // Parse the JSON response
        const response = await request.json();
        return response;
    }catch(error){
        // Log any errors that occur during the API call
        console.error('error',error);
    }
}

// Function to create a new organization
async function createOrganization(orgName,workspaceName){
    try{
        // Make a POST request to create a new organization with the specified name and workspace
        const request = await fetch(`${apiBaseUrl}/organizations`,{
            method:'POST',
            body: JSON.stringify({
                name:orgName,
                workspace_name:workspaceName
            }),
            headers
        });
        // Parse the JSON response
        const response = await request.json();
        return response;
    }catch(error){
        // Log any errors that occur during the API call
        console.error('error',error);
    }
}

// Function to get projects in a specific workspace
async function getWorkspaceProjects(workspace_id){
    try{
        // Make a GET request to retrieve projects for a given workspace ID
        const request =  await fetch(`${apiBaseUrl}/workspaces/${workspace_id}/projects`,{headers});
        // Parse the JSON response
        const response = await request.json();
        return response;
    }catch(error){
        // Log any errors that occur during the API call
        console.error('error',error)
    }
}

// Function to create a new project in a workspace
async function createWorkspaceProjects(workspace_id,projectName,color){
    try{
        // Make a POST request to create a new project within a workspace
        const request =  await fetch(`${apiBaseUrl}/workspaces/${workspace_id}/projects`,{
            method:'POST',
            body:JSON.stringify({
                'active':true,
                'name':projectName
            }),
            headers});
        // Parse the JSON response
        const response = await request.json();
        return response;
    }catch(error){
        // Log any errors that occur during the API call
        console.error('error',error)
    }
}

// Function to add a new task to a project
async function addTaskToProject(workspace_id,project_id,name,estimated_seconds){
    try{
        // Make a POST request to add a task to a specific project in a workspace
        const request = await fetch(`${apiBaseUrl}/workspaces/${workspace_id}/projects/${project_id}/tasks`,{
            method:'POST',
            headers,
            body:JSON.stringify({
                name,
                estimated_seconds
            })
        });
        // Parse the JSON response
        const response = await request.json();
        return response;
    }catch(error){
        // Log any errors that occur during the API call
        console.error('error',error);
    }
}

// Function to add a time entry to a task
async function addTimeEntryToTask(workspace_id,project_id,task_id,description,duration,start){
    try{
        // Make a POST request to create a time entry for a task
        const request = await fetch(`${apiBaseUrl}/workspaces/${workspace_id}/time_entries`,{
            method:'post',
            body:JSON.stringify({
                project_id,
                task_id,
                workspace_id,
                description,
                duration,
                start,
                created_with:'VideoApiDemo'
            }),
            headers
        });
        // Parse the JSON response
        const response = await request.json();
        return response;
    }catch(error){
        // Log any errors that occur during the API call
        console.error('error',error);
    }
}

// Self-invoking async function to execute the above functions
(async()=>{
    // Retrieve and log the current user's information
    const me = await getMe();
    // console.log(me); // Uncomment to log user details

    // Example: Create a new organization and log the response
    const newOrg = await createOrganization('CodingWithAdo','Videos');
    // console.log(newOrg);

    // Specify a workspace ID for further operations
    const workspace_id = newOrg.id;

    // Example: Create a new project within the specified workspace
    // await createWorkspaceProjects(workspace_id,'Toggl Video');
    // Retrieve and log the projects in the specified workspace
    const projects = await getWorkspaceProjects(workspace_id);
    // console.log(projects); // Uncomment to log project details

    // Example: Add a new task to the first project in the workspace
    const newTask = await addTaskToProject(workspace_id, projects[0].id, 'Test project', 900);

    // Specify a task ID for further operations
    const task_id = newTask.id; // Replace with a valid task ID

    // Add a time entry to a specific task and log the response
    const timeEntry = await addTimeEntryToTask(workspace_id, projects[0].id, task_id, 'Coding for a bit', 120, new Date().toISOString());
    console.log(timeEntry);
})(); // End of self-invoking function
