import next from "next";
import express from "express";
import http from "http";

// const next = require("next");
// const express = require("express");
// const http = require("http");


const dev = process.env.NODE_ENV !== "production";
const port = (process.env.PORT as number | undefined) || 3000;
const nextApp = next({ dev, port, customServer: true });
const requestHandler = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);

app.use("/api", (req, res) => res.send('wait'));
app.use(async (req, res) => {
    requestHandler(req, res);
});

nextApp.prepare().then(() => {
    server.listen(port, () => {
        console.log("server started on http://127.0.0.1:" + port);
    });
});
