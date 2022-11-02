//Finger Points to join
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20]
}

// Drawing the Landmarks on the hand
export const drawHand = (predictions, ctx) => {
    //Checking if the hand is present
    if (predictions.length > 0) {
        //Looping through each prediction
        predictions.forEach((prediction) => {

            // for grabbing the landmarks
            const landmarks = prediction.landmarks;

            //Loop for drawing line
            //Loop through fingers
            for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
                let finger = Object.keys(fingerJoints)[j];
                //Loop through points on finger
                for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                    const firstJointIndex = fingerJoints[finger][k];
                    const secondJointIndex = fingerJoints[finger][k + 1];

                    //Path draw on canvas
                    ctx.beginPath();
                    ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
                    ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
                    ctx.strokeStyle = "plum";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }

            // Loop for each landmark point to draw
            for (let i = 0; i < landmarks.length; i++) {
                // x position of point
                const x = landmarks[i][0]
                // y position of point
                const y = landmarks[i][1]
                //Arc method for making circle
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 3 * Math.PI)
                ctx.fillStyle = "indigo";
                ctx.fill();
            }
        });
    }
}