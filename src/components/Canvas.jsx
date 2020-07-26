import React from 'react';
import Sketch from 'react-p5';
import './CanvasStyle.css';
import {data, edges} from '../fetch';


function drawDatapoint (p5, x, y){
    p5.noStroke();
    p5.fill(255, 189, 135);
    p5.ellipse(x, y, 20, 20);

    p5.fill(255, 148, 60);
    p5.ellipse(x, y, 12, 12);

    p5.fill(250, 118, 11);
    p5.ellipse(x, y, 6, 6);

    p5.stroke(255);
}

function drawEdge(p5, first, second){
    p5.stroke("#ffcbc5");
    p5.strokeWeight(1);
    const node1 = data.find((val, index)=>{
        return (val.key === first);
    });
    const node2 = data.find((val, index)=>{
        return (val.key === second);
    }); 
    p5.line(node1.x, node1.y, node2.x, node2.y);
}

function nodeIntract(p5, x, y){
    const thresRadius = 300;
    for(let i = 0; i<data.length; i++){
        let distance = (data[i].x - x)**2 + (data[i].y - y)**2 + 0.0;
        if(distance <= thresRadius**2){
            distance = Math.sqrt(distance);
            const alpha = p5.map(distance, 0, thresRadius, 1, 0);
            //console.log(alpha);
            p5.stroke(`rgba(255, 165, 0,${alpha})`);
            p5.line(x, y, data[i].x, data[i].y);
        }
    }
}

function adjustEdges(p5){
    //fetch edges object with key as end points
    let geometricEdge = [];
    for(let i = 0; i<edges.length; i++){
        let obj = {
            key : edges[i].key,
            start : {
                x : data.find((val, index) => val.key === edges[i].first).x,
                y : data.find((val, index) => val.key === edges[i].first).y,
                vx : 0,
                vy : 0,
            },
            end : {
                x : data.find((val, index) => val.key === edges[i].second).x,
                y : data.find((val, index) => val.key === edges[i].second).y,
                vx : 0,
                vy : 0,
            },
        }
        let sqLength = (obj.start.x - obj.end.x)**2 + (obj.start.y - obj.end.y)**2;
        obj.sqLength = sqLength;
        geometricEdge.push(obj);
    }

    const orignalLength = 200;
    for(let i = 0; i<geometricEdge.length; i++){
        let edge = geometricEdge[i];
        let theta = Math.atan((edge.end.y - edge.start.y)/(edge.end.x - edge.start.x));
        const k_m = 0.5;
        //calc accel magnitude
        const accel = k_m*(Math.sqrt(edge.sqLength) - orignalLength);
        //start of edge
        //update velocity
        edge.start.vx += accel * Math.cos(Math.abs(theta)) * Math.sign(edge.end.x - edge.start.x);
        edge.start.vy += accel * Math.sin(Math.abs(theta)) * Math.sign(edge.end.y - edge.start.y);

        //update positions
        edge.start.x += edge.start.vx;
        edge.start.y += edge.start.vy;

        //end of edge
        //update velocity
        /*edge.end.vx -= edge.start.vx;
        edge.end.vy -= edge.start.vy;*/
        edge.end.vx += accel * Math.cos(Math.abs(theta)) * Math.sign(edge.start.x - edge.end.x);
        edge.end.vy += accel * Math.sin(Math.abs(theta)) * Math.sign(edge.start.y - edge.end.y);
        //update positions
        edge.end.x += edge.end.vx;
        edge.end.y += edge.end.vy;
    }

    //update edges and nodes
    geometricEdge.forEach((val, index) => {
       let edge = edges.find((in_val, index) => in_val.key === val.key);
       let node1 = data.find((in_val, index) => in_val.key === edge.first);
       let node2 = data.find((in_val, index) => in_val.key === edge.second);

       node1.x = val.start.x;
       node1.y = val.start.y;

       node2.x = val.end.x;
       node2.y = val.end.y;
    })
}

function repelNode(p5){
    let geometricData = [];
    for(let i = 0; i<data.length; i++){
        let obj = {
            key : data[i].key,
            x : data[i].x,
            y : data[i].y,
            vx : 0,
            vy : 0,
        }

        geometricData.push(obj);
    }

    const repelConstant = 3000;
    const thresRadius = 199;
    for(let i = 0; i<geometricData.length; i++){
        const current = geometricData[i];
        geometricData.forEach((other, index) => {
            if(other.key !== current.key){
                const sqDist = (current.x - other.x)**2 + (current.y - other.y)**2;
                if(sqDist <= thresRadius**2){
                    const accel = repelConstant/(1 + sqDist);
                    const theta = Math.atan((other.y - current.y) / (other.x - current.x));
                    
                    //update velocities
                    current.vx += accel * Math.cos(Math.abs(theta)) * Math.sign(current.x - other.x);
                    current.vy += accel * Math.sin(Math.abs(theta)) * Math.sign(current.y - other.x);
                    //update positions
                    current.x += current.vx;
                    current.y += current.vy;
                }
            }
        });
    }

    data.forEach((val, index) => {
        const corresponding = geometricData.find((in_val, index) => in_val.key === val.key);
        val.x = corresponding.x;
        val.y = corresponding.y;
    });
}
let origin = {
    x : 0,
    y : 0,
}
function mouseDragged(p5){
    if(p5.mouseIsPressed){
        origin.x += -p5.pmouseX + p5.mouseX;
        origin.y += -p5.pmouseY + p5.mouseY;
        p5.redraw();
    }
}

export default class Canvas extends React.Component{

    setup = (p5, canvasParentRef) => {
        const width = 96*window.innerWidth/100;
        const height = 95*window.innerHeight/100;
        p5.createCanvas(width, height).parent(canvasParentRef);
    }

    draw = (p5) => {
        p5.background(0, 80);
        //assume edges as springs with damping
        adjustEdges(p5);
        repelNode(p5);
        mouseDragged(p5);
        p5.translate(origin.x, origin.y);
        edges.forEach(element => {
            drawEdge(p5, element.first, element.second);
        });
        data.forEach(element => {
            drawDatapoint(p5, element.x, element.y);
        });
        nodeIntract(p5, p5.mouseX - origin.x, p5.mouseY - origin.y);
        p5.noFill();
        p5.circle(p5.mouseX - origin.x, p5.mouseY - origin.y, 2);

    }

    render(props){
        return (
            <div className="canvas">
                <Sketch setup = {this.setup} draw = {this.draw} />
                <div className="playground">
                </div>
            </div>
        );
    }
}