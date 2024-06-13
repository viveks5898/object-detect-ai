    "use client";
    import React, { useEffect, useRef, useState } from "react";
    import Webcam from "react-webcam";
    import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
    import * as tf from "@tensorflow/tfjs";
    import renderPredictions from "../utils/render-predictions";
    let detectInterval = "";

    const WebCam = () => {
    const videoConstraints = {
        width: 1080,
        height: 720,
        facingMode: "user",
    };

    const [isLoading, setIsLoading] = useState(false);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runCoco = async () => {
        setIsLoading(true);
        const net = await cocoSSDLoad();
        setIsLoading(false);
        detectInterval = setInterval(() => {
        runObjectDetection(net);
        });
    };

    async function runObjectDetection(net) {
        if (
        canvasRef.current &&
        webcamRef.current !== null &&
        webcamRef.current.video?.readyState === 4
        ) {
        canvasRef.current.width = webcamRef.current.video.videoWidth;
        canvasRef.current.height = webcamRef.current.video.videoHeight;
        const detect = await net.detect(webcamRef.current.video, undefined, 0.6);

        const context = canvasRef.current.getContext("2d");
        renderPredictions(detect, context);
        }
    }
    const showMyVideo = () => {
        if (
        webcamRef.current !== null &&
        webcamRef.current.video?.readyState == 4
        ) {
        const myVideoWIdth = webcamRef.current.video.videoWidth;
        const myVideoHeight = webcamRef.current.video.videoHeight;
        webcamRef.current.video.width = myVideoWIdth;
        webcamRef.current.video.height = myVideoHeight;
        }
    };
    useEffect(() => {
        runCoco();
        showMyVideo();
    }, []);
    return (
        <div className="text-center sm:w-[50%] m-auto relative">
        {isLoading ? (
            <div className="text-white text-center"> Loading AI Model</div>
        ) : (
            <Webcam
            audio={false}
            ref={webcamRef}
            height={720}
            screenshotFormat="image/jpeg"
            className="rounded-md  border-[8px] shadow-lg p-2 border-white"
            muted
            width={1280}
            videoConstraints={videoConstraints}
            >
            {({ getScreenshot }) => (
                <button
                onClick={() => {
                    const imageSrc = getScreenshot();
                }}
                >
                Capture photo
                </button>
            )}
            </Webcam>
        )}
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-[99999] w-full lg:h-[720px]"
        />
        </div>
    );
    };

    export default WebCam;
