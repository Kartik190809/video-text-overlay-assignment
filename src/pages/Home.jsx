import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Rnd } from 'react-rnd';

const Home = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [currentTextBox, setCurrentTextBox] = useState(null);
  const videoRef = useRef(null);

  const addTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      text: 'New Text',
      x: 10,
      y: 10,
      width: 100,
      height: 50,
      fontSize: 16,
      color: '#000000',
      backgroundColor: '#ffffff',
    };
    setTextBoxes([...textBoxes, newTextBox]);
    setCurrentTextBox(newTextBox);
  };

  const updateTextBox = (id, updates) => {
    setTextBoxes(textBoxes.map(box => box.id === id ? { ...box, ...updates } : box));
    setCurrentTextBox(prev => prev && prev.id === id ? { ...prev, ...updates } : prev);
  };

  const deleteTextBox = (id) => {
    setTextBoxes(textBoxes.filter(box => box.id !== id));
    if (currentTextBox && currentTextBox.id === id) {
      setCurrentTextBox(null);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Video Section */}
      <div className="w-2/3 bg-gray-100 p-4 relative">
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: "url('/new-background.jpg')" }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain relative z-10"
            controls
          >
            <source src="/path-to-your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {textBoxes.map((box) => (
            <Rnd
              key={box.id}
              size={{ width: box.width, height: box.height }}
              position={{ x: box.x, y: box.y }}
              onDragStop={(e, d) => updateTextBox(box.id, { x: d.x, y: d.y })}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateTextBox(box.id, {
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
              className="z-20"
            >
              <div
                className="relative"
                style={{
                  width: '100%',
                  height: '100%',
                  fontSize: `${box.fontSize}px`,
                  color: box.color,
                  backgroundColor: box.backgroundColor,
                }}
              >
                {box.text}
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => deleteTextBox(box.id)}
                >
                  <X size={16} />
                </button>
              </div>
            </Rnd>
          ))}
        </div>
      </div>

      {/* Configuration Section */}
      <div className="w-1/3 bg-white p-4 overflow-y-auto">
        <Button onClick={addTextBox} className="mb-4">Add Text</Button>

        {currentTextBox && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Input
                id="text"
                value={currentTextBox.text}
                onChange={(e) => updateTextBox(currentTextBox.id, { text: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Slider
                id="fontSize"
                min={8}
                max={72}
                step={1}
                value={[currentTextBox.fontSize]}
                onValueChange={(value) => updateTextBox(currentTextBox.id, { fontSize: value[0] })}
              />
            </div>

            <div>
              <Label htmlFor="color">Text Color</Label>
              <Input
                id="color"
                type="color"
                value={currentTextBox.color}
                onChange={(e) => updateTextBox(currentTextBox.id, { color: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={currentTextBox.backgroundColor}
                onChange={(e) => updateTextBox(currentTextBox.id, { backgroundColor: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;