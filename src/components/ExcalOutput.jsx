import { Excalidraw, exportToSvg } from "@excalidraw/excalidraw"
import { useState } from "react"

export default function ExcalOutput() {
    const [svgContent, setSvgContent] = useState("") // Store the SVG content as a string
    const [excalidrawAPI, setExcalidrawAPI] = useState(null)
    const initialData = {}

    const clickHandler = async () => {
        if (!excalidrawAPI) {
            return
        }
        const elements = excalidrawAPI.getSceneElements()

        if (!elements || !elements.length) {
            return
        }

        const svgElement = await exportToSvg({
            elements,
            appState: {
                ...initialData.appState,
                exportWithDarkMode: false,
            },
            exportPadding: 10, // You can adjust the export padding as needed
            metadata: "Your metadata here", // You can add metadata if necessary
            files: excalidrawAPI.getFiles(),
        })

        // Serialize the SVG element to a string
        const svgString = new XMLSerializer().serializeToString(svgElement)

        setSvgContent(svgString)
    }

    return (
        <>
            <div style={{ height: "400px", border: "1px solid gray" }}>
                <Excalidraw ref={api => setExcalidrawAPI(api)} />
            </div>

            <button
                className="custom-button"
                style={{
                    margin: "24px",
                    padding: "6px",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                onClick={clickHandler}
            >
                Export to SVG
            </button>

            <h3>Output</h3>

            <div
                className="export export-svg"
                style={{
                    height: "400px",
                    width: "600px",
                    border: "1px solid gray",
                }}
            >
                {/* Render the SVG string directly */}
                <div dangerouslySetInnerHTML={{ __html: svgContent }} />
            </div>
        </>
    )
}
