import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {AxialCoordinates, getNewLayout, Hex, TILE_TYPES} from "./Catan";

const CANVAS_SIZE = 2000
export const Board = ({layout} : {layout: Hex[]}) => {
    const [ctx, setCtx] = useState<null | CanvasRenderingContext2D>()

    useEffect(() => {
        if (ctx && layout) {
            const canvas = ctx.canvas
            const {offsetWidth, offsetHeight} = canvas.parentElement || {offsetWidth: 0, offsetHeight: 0}
            const max = Math.max(offsetHeight, offsetWidth);
            canvas.width = canvas.height = max
            ctx.font = `bold ${canvas.width / 40}px Arial`
            ctx.textBaseline = "middle"
            ctx.textAlign = 'center'
            renderCatanBoard(ctx, layout)
        }
    }, [ctx, layout])

    return <AspectContainer>
        <Canvas ref={e => e && setCtx(e.getContext('2d'))} height={CANVAS_SIZE} width={CANVAS_SIZE}/>
    </AspectContainer>
}


const renderCatanBoard = (ctx: CanvasRenderingContext2D, layout: Hex[]) => {
    function renderHexagonalLayout(layout: Hex[], ctx: CanvasRenderingContext2D, margin: number = 2): void {
        // Calculate the dimensions of the layout
        let minQ = 0, maxQ = 0, minR = 0, maxR = 0;
        layout.forEach((coord: AxialCoordinates) => {
            minQ = Math.min(minQ, coord.q);
            maxQ = Math.max(maxQ, coord.q);
            minR = Math.min(minR, coord.r);
            maxR = Math.max(maxR, coord.r);
        });
        // Calculate the center of the canvas
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        const effectiveTileSize = canvasWidth / (Math.sqrt(3) * (maxQ - minQ + 1))
        const tileSize = effectiveTileSize - 2 * margin

        // Calculate the top-left corner of the layout
        const layoutX = centerX - canvasWidth / 2;
        const layoutY = centerY - canvasHeight / 2;

        ctx.fillStyle = '#fff'; // Set the fill color to white
        ctx.strokeStyle = '#000'; // Set the stroke color to black

        layout.forEach((hex: Hex) => {
            const {q, r} = hex
            const x = effectiveTileSize * Math.sqrt(3) * (hex.q - minQ + (hex.r - minR) / 2) + layoutX - effectiveTileSize * Math.sqrt(3) / 2;
            const y = effectiveTileSize * 3 / 2 * (hex.r - minR) + layoutY + effectiveTileSize;

            // Draw a hexagonal tile at the current coordinates
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = 2 * Math.PI / 6 * (i + 0.5);
                const px = x + tileSize * Math.cos(angle);
                const py = y + tileSize * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.closePath();
            ctx.fillStyle = TILE_TYPES[hex.terrain].color
            ctx.fill();
            ctx.stroke();

            // let aboveRightNeighbour = getBelowRightNeighbour(q, r);
            // const label = `${q}, ${r} ${aboveRightNeighbour.q}, ${aboveRightNeighbour.r}`
            if (hex.num) {
                ctx.beginPath()
                ctx.arc(x, y, effectiveTileSize / 5, 0, 2 * Math.PI, false)
                ctx.fillStyle = '#fff'
                ctx.fill();
                ctx.stroke()
                ctx.closePath()
                ctx.fillStyle = (hex.num === 8 || hex.num === 6) ? '#ff3333' : '#000'
                const label = String(hex.num)
                ctx.fillText(label, x, y)
            } else {
                ctx.beginPath()
                ctx.arc(x, y, effectiveTileSize / 5, 0, 2 * Math.PI, false)
                ctx.fillStyle = '#555555'
                ctx.fill();
                ctx.stroke()
                ctx.closePath()
            }


            ctx.fillStyle = '#fff'
        });
    }

    renderHexagonalLayout(layout, ctx, 1)
}

const AspectContainer = styled.div`
  max-height: 100%;
  margin: auto;
  aspect-ratio: 1;
  //flex: 1;
  position: relative;
`

const Canvas = styled.canvas`
  aspect-ratio: 1;
`