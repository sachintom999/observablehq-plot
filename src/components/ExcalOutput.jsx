import { Excalidraw, exportToCanvas } from "@excalidraw/excalidraw"
import { useState } from "react"

export default function ExcalOutput() {
    const [canvasUrl, setCanvasUrl] = useState("")
    const [excalidrawAPI, setExcalidrawAPI] = useState(null)
    const initialData = {}

    return (
        <>
            <button
                className="custom-button"
                onClick={async () => {
                    if (!excalidrawAPI) {
                        return
                    }
                    const elements = excalidrawAPI.getSceneElements()

                    console.log(elements)
                    if (!elements || !elements.length) {
                        return
                    }
                    const canvas = await exportToCanvas({
                        elements,
                        appState: {
                            ...initialData.appState,
                            exportWithDarkMode: false,
                        },
                        files: excalidrawAPI.getFiles(),
                        getDimensions: () => {
                            return { width: 350, height: 350 }
                        },
                    })
                    const ctx = canvas.getContext("2d")
                    // ctx.font = "30px Virgil"
                    // ctx.strokeText("My custom text", 50, 60)
                    setCanvasUrl(canvas.toDataURL())
                }}
            >
                Export to Canvas
            </button>

            <div style={{ height: "400px" }}>
                <Excalidraw ref={api => setExcalidrawAPI(api)} />
            </div>

            <h3>Output</h3>

            <div className="export export-canvas"  style={{ height: "400px" ,width:"600px" }}>
                <img src={canvasUrl} alt="" />
            </div>
        </>
    )
}
