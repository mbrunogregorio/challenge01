const express = require('express');

const server = express();
server.use(express.json());

const projects = [
    {id: "1", nome: "Project X", tasks:["Every", "Day", "I'm", "Shufflin"]}
];
var total_reqs = 0;

server.use((req, res, next) => {
    total_reqs++;

    console.log(`${total_reqs} requests until now`);
    return next();
})

function checkProjectExists(req, res, next){
    const project = projects[req.id];

    if(!project){
        return res.status(400).json({error: 'Project doesn`t exist'});
    }
    req.project = project;
    return next();
}

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.get("/projects/:id", checkProjectExists, (req, res) => {
    const {id} = req.params;
    const project = projects.map(item => {
        if(item.id === id)
            return item;
    });

    res.json(project);
})

server.post('/projects', (req, res) => {
    const { id, name, tasks } = req.body;
    const project = {id, name, tasks};
    projects.push(project);

    return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    projects.map(item => {
        if(item.id === id);
            item.name = name;
    });

    return res.json(projects);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    let index = projects.findIndex(item => item.id==id);
    projects.splice(index, 1);

    return res.send();
})


server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { title } = req.body;
    let index = projects.findIndex(item => item.id==id);
    projects[index].tasks.push(title);

    return res.json(projects);
})

server.listen(3000);