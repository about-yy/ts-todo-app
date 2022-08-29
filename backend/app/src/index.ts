import express from "express";
const app: express.Express = express();

app.listen(process.env.PORT, ()=>{
    console.log("Start on port "+process.env.PORT);
});

app.get('/test', (req: express.Request, res: express.Response)=>{
    res.send("hello from index");
});