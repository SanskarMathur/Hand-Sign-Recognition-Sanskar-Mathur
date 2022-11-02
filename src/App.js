import React, { useEffect, useRef, useState } from "react";    //useRef for making references
// useState for changing the state of our application on working condition
import Webcam from "react-webcam";    //for webcam support
import './App.css';

//Tensor-flow, fingerpose API Libraries
import * as tf from "@tensorflow/tfjs";   //for Tensorflow API
import * as handpose from "@tensorflow-models/handpose";    //for handpose (mediapipe) API
//Backend work on the handpose library
import { drawHand } from "./utilities";
import * as fp from "fingerpose";

// Gestures Detected are :-
// 1. Victory
// 2. Thumbs Up
// 3. Thumbs Down
// 4. One
// 5. Five

//Gesture file, Images imported
import { dislikeGesture, oneGesture, fiveGesture } from "./Gestures_file.js";
import CamOff from './vc.png';
import vidCam from './video-camera.png'

function App() {
  //Reference variables (predefined as null)
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //State Variables preset appropriately
  const [show, setShow] = useState(false);
  const [emoji, setEmoji] = useState("");

  // Running the Handpose model from the Tensorflow-API
  const runHandpose = async () => {
    const net = await handpose.load();
    alert("The Model is Loading. Please Wait");

    // Making a global variable for appending to the text area
    window.global_text = "";
    window.previous = "";

    //Looping the detect function to detect the hands
    setInterval(() => {
      detect(net);
    }, 100)
  };

  //To run the handpose model only once otherwise it runs on loop
  useEffect(() => {
    runHandpose();
  }, [])

  const detect = async (net) => {
    // Checking if video data is available
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null &&   //webcam is defined and not null
      webcamRef.current.video.readyState === 4)   //data is being recieved
    {
      //Extracting the video properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      //Forcing the video properties to the canvas/display for accurate display of handmesh
      video.height = videoHeight;
      video.width = videoWidth;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Making the Detections
      const hand = await net.estimateHands(video);    //net is the variable for handpose load

      //if hand is being detected then it will read
      if (hand.length > 0) {
        //All the gestures
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture, fp.Gestures.ThumbsUpGesture,
          dislikeGesture, oneGesture, fiveGesture,
        ]);

        //Estimating the landmarks of the hands
        const gesture = await GE.estimate(hand[0].landmarks, 9.0);
        console.log(gesture, "OK TESTED");

        //Checking what gesture the hand is making & also if it is defined by us
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {

          //Mapping the confidence of all the gestures the hand is cuurently doing (if found multiple possibilities)
          const confidence = gesture.gestures.map((prediction) => prediction.score);

          //Checking the maximum confidence among all the possibilities
          const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));
          
          //Checking if the gesture is changed as one gesture means one message
          if (gesture.gestures[maxConfidence].name !== window.previous) {
            window.global_text = window.global_text + " " + gesture.gestures[maxConfidence].name
          }

          //Updating the Gesture Value
          setEmoji(window.global_text);
          window.previous = gesture.gestures[maxConfidence].name
        }
      };

      //Drawing the Points, Lines on canvas
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx)
    }
  }

  //Refreshing the Page
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Heading">
          <span className="Title">Hand Sign Recognition</span>
        </div>
        {/* Taking input from the webcam and showing it on the webpage with on & off*/}
        {
          show ?
            <div>
              <Webcam ref={webcamRef} className="webcam" />
              {/* Setting up the canvas for drawing the landmarks*/}
              <canvas ref={canvasRef} className="canvas" />
            </div> : <img className="cam-off" src={CamOff} style={{}} />

        }
        <button onClick={() => setShow(!show)} className="cam-btn">
          <img src={vidCam} width="30" />
        </button>

        {/* Text Area for output */}
        {emoji !== undefined ? <div className="textArea">{emoji}</div> : ""}

        {/* Reset Button */}
        <div className="reset-btn-class">
          <button className="reset-btn" onClick={refreshPage}>Reset</button>
        </div>

      </header>
    </div>
  );
}

export default App;
