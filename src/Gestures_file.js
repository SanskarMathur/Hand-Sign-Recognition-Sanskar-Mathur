import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

// Gestures here are :-
// 1. Thumbs Down
// 2. One
// 3. Five

//Defining Gesture Descriptions
export const dislikeGesture = new GestureDescription('thumbs_down');

//Adding the Information of the Gesture for the Thumb
dislikeGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
dislikeGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
dislikeGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
dislikeGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);

//Gesture Info for other fingers is same
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  dislikeGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  dislikeGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  dislikeGesture.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
  dislikeGesture.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
}

export const oneGesture = new GestureDescription('one');

oneGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
oneGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
for (let finger of [Finger.Thumb, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  oneGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  oneGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export const fiveGesture = new GestureDescription('five');

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  fiveGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  fiveGesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  fiveGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  fiveGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.75);
  fiveGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.75);
}

fiveGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
fiveGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.75);
fiveGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
fiveGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
fiveGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
fiveGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);
fiveGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
fiveGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);
