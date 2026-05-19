"use client";

import { boardConfig, boardPixels } from "@/lib/board";
import { useEffect, useMemo, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PixelPicker() {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dragAnchor, setDragAnchor] = useState<{ x: number; y: number } | null>(null);

  const safeWidth = clamp(width, 1, boardConfig.columns - startX);
  const safeHeight = clamp(height, 1, boardConfig.rows - startY);
  const endX = startX + safeWidth - 1;
  const endY = startY + safeHeight - 1;
  const firstPixelId = boardPixels[startY * boardConfig.columns + startX]?.pixelId;
  const lastPixelId = boardPixels[endY * boardConfig.columns + endX]?.pixelId;

  const selectedPixelIds = useMemo(
    () =>
      boardPixels
        .filter(
          (pixel) =>
            pixel.x >= startX &&
            pixel.x <= endX &&
            pixel.y >= startY &&
            pixel.y <= endY,
        )
        .map((pixel) => pixel.pixelId),
    [endX, endY, startX, startY],
  );

  useEffect(() => {
    if (!isPickerOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const finishSelection = () => setDragAnchor(null);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
      }
    };

    window.addEventListener("pointerup", finishSelection);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("pointerup", finishSelection);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isPickerOpen]);

  function selectRectangle(anchor: { x: number; y: number }, target: { x: number; y: number }) {
    const nextStartX = Math.min(anchor.x, target.x);
    const nextStartY = Math.min(anchor.y, target.y);
    const nextEndX = Math.max(anchor.x, target.x);
    const nextEndY = Math.max(anchor.y, target.y);

    setStartX(nextStartX);
    setStartY(nextStartY);
    setWidth(nextEndX - nextStartX + 1);
    setHeight(nextEndY - nextStartY + 1);
  }

  function beginSelection(pixel: { x: number; y: number }) {
    const anchor = { x: pixel.x, y: pixel.y };
    setDragAnchor(anchor);
    selectRectangle(anchor, anchor);
  }

  function previewSelection(pixel: { x: number; y: number }) {
    if (dragAnchor) {
      selectRectangle(dragAnchor, pixel);
    }
  }

  return (
    <fieldset className="pixelPicker wide">
      <legend>Choose pixels</legend>
      <input name="startX" type="hidden" value={startX} />
      <input name="startY" type="hidden" value={startY} />
      <input name="endX" type="hidden" value={endX} />
      <input name="endY" type="hidden" value={endY} />
      <input name="width" type="hidden" value={safeWidth} />
      <input name="height" type="hidden" value={safeHeight} />
      <input name="selectedPixelIds" type="hidden" value={selectedPixelIds.join(",")} />

      <div className="pixelPickerSummary">
        <div>
          <span>Selected area</span>
          <strong>
            {safeWidth} x {safeHeight} pixels
          </strong>
        </div>
        <div>
          <span>Pixel IDs</span>
          <strong>
            {firstPixelId} to {lastPixelId}
          </strong>
        </div>
        <button type="button" onClick={() => setIsPickerOpen(true)}>
          Open full-screen pixel grid
        </button>
      </div>

      {isPickerOpen ? (
        <div className="pixelPickerOverlay" role="dialog" aria-modal="true" aria-label="Pixel grid selector">
          <div className="pixelPickerModal">
            <div className="pixelPickerTopbar">
              <div>
                <p>Full board selector</p>
                <h2>Drag across the board to reserve your rectangle.</h2>
              </div>
              <button type="button" onClick={() => setIsPickerOpen(false)}>
                Done
              </button>
            </div>

            <div className="pixelPickerStats">
              <div>
                <span>Rectangle</span>
                <strong>
                  {safeWidth} x {safeHeight}
                </strong>
              </div>
              <div>
                <span>Total pixels</span>
                <strong>{selectedPixelIds.length.toLocaleString()}</strong>
              </div>
              <div>
                <span>Selection</span>
                <strong>
                  {firstPixelId} to {lastPixelId}
                </strong>
              </div>
            </div>

            <div className="actualBoardPicker" aria-label="Actual board pixel picker">
              {boardPixels.map((pixel) => {
                const isSelected =
                  pixel.x >= startX && pixel.x <= endX && pixel.y >= startY && pixel.y <= endY;

                return (
                  <button
                    aria-label={`Select ${pixel.pixelId}`}
                    aria-pressed={isSelected}
                    className={isSelected ? "isSelected" : ""}
                    key={pixel.pixelId}
                    title={pixel.pixelId}
                    type="button"
                    onPointerDown={() => beginSelection(pixel)}
                    onPointerEnter={() => previewSelection(pixel)}
                    onFocus={() => previewSelection(pixel)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </fieldset>
  );
}
