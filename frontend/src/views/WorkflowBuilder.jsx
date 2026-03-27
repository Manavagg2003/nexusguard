import React, { useState, useContext, useRef } from "react";
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragOverlay,
  useDroppable
} from "@dnd-kit/core";
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  sortableKeyboardCoordinates,
  arrayMove
} from "@dnd-kit/sortable";
import { 
  Button, 
  Typography, 
  IconButton, 
  Drawer, 
  TextField,
  Divider,
} from "@mui/material";
import { 
  ArrowBack as ArrowBackIcon, 
  Save as SaveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Context } from "../context/ContextApi.jsx";
import { getTheme } from "../theme.jsx";

import WorkflowBuilderSidebar from "../components/WorkflowBuilderSidebar.jsx";
import WorkflowCanvasNode from "../components/WorkflowCanvasNode.jsx";

const WorkflowBuilder = (props) => {
  const navigate = useNavigate();
  const { themeMode, brandColor, leftSideBarOpenByClick } = useContext(Context);
  const theme = getTheme(themeMode, brandColor);

  const [nodes, setNodes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeApp, setActiveApp] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable',
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveApp(active.data.current?.app);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveApp(null);

    // Case 1: Dragging from sidebar to canvas
    if (active.id.startsWith('sidebar-')) {
      // Check if dropped directly over a registered dropzone
      const isOverCanvas = over && (over.id === 'canvas-droppable' || String(over.id).startsWith('node-'));
      
      // Fallback: Use absolute screen coordinates. 
      // The canvas resides entirely to the right of the 280px sidebar.
      // If the left edge of the dropped item is greater than 250px, it's on the canvas.
      const draggedRect = active.rect.current.translated;
      const isOverCanvasArea = draggedRect && draggedRect.left > 250;
      
      const droppedOnCanvas = isOverCanvas || isOverCanvasArea;

      if (droppedOnCanvas) {
        // Use activeApp state backup to avoid null active.data losses on complex re-renders
        const app = activeApp || active.data.current?.app;
        if (app) {
          const newNode = {
            id: `node-${Date.now()}`,
            name: app.name,
            category: app.category,
            color: app.color,
            description: app.description,
            iconUrl: app.iconUrl,
            config: {},
          };
          setNodes((prev) => [...prev, newNode]);
          setSelectedNode(newNode);
        }
      }
    } 
    // Case 2: Reordering nodes within canvas
    else if (active.id.startsWith('node-')) {
      if (over && active.id !== over.id) {
        setNodes((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  const handleDeleteNode = (id) => {
    setNodes((prev) => prev.filter(node => node.id !== id));
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    }
  };

  const handleSave = () => {
    toast.success("Workflow Builder coming soon! This is a UI preview only.");
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: theme?.palette?.backgroundColor || "#121212",
      color: "white",
      overflow: "hidden",
      paddingLeft: leftSideBarOpenByClick ? 200 : 65,
      transition: "padding-left 0.3s ease",
    }}>
      {/* Top Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "64px",
        background: theme?.palette?.surfaceColor || "#1A1A2E",
        borderBottom: `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.1)"}`,
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <IconButton onClick={() => navigate("/workflows")} style={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            Visual Workflow Builder (Beta)
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={handleSave}
            style={{ fontWeight: "bold" }}
          >
            Save Workflow
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          
          {/* Left Sidebar - App Palette */}
          <WorkflowBuilderSidebar theme={theme} />

          {/* Center Canvas Area */}
          <div 
            ref={setDroppableNodeRef}
            id="canvas-droppable"
            style={{ 
              flex: 1, 
              display: "flex", 
              justifyContent: "center",
              padding: "40px",
              overflowY: "auto",
              position: "relative",
              background: isOver ? "rgba(255,133,68,0.05)" : "transparent",
              transition: "background 0.2s ease"
            }}
            onClick={() => setSelectedNode(null)}
          >
            {nodes.length === 0 ? (
              <div style={{
                margin: "auto",
                textAlign: "center",
                color: "rgba(255,255,255,0.4)"
              }}>
                <Typography variant="h5" style={{ marginBottom: 16 }}>
                  Drag & Drop apps here
                </Typography>
                <Typography variant="body1">
                  Build your workflow by combining security tools from the library.
                </Typography>
              </div>
            ) : (
              <div style={{ width: "280px", position: "relative" }}>
                
                {/* Visual connecting line behind nodes */}
                {nodes.length > 1 && (
                  <div style={{
                    position: "absolute",
                    top: "40px",
                    bottom: "40px",
                    left: "50%",
                    width: "2px",
                    background: theme?.palette?.primary?.main || "#FF8544",
                    opacity: 0.5,
                    zIndex: 0,
                    transform: "translateX(-50%)"
                  }} />
                )}

                <SortableContext 
                  items={nodes.map(n => n.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {nodes.map((node) => (
                    <WorkflowCanvasNode 
                      key={node.id} 
                      id={node.id} 
                      node={node} 
                      onDelete={handleDeleteNode}
                      onConfigure={setSelectedNode}
                      isSelected={selectedNode?.id === node.id}
                      theme={theme}
                    />
                  ))}
                </SortableContext>
              </div>
            )}
          </div>

          {/* Right Properties Panel */}
          {selectedNode && (
            <div style={{ 
              width: "320px", 
              background: theme?.palette?.surfaceColor || "#1A1A2E",
              borderLeft: `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.1)"}`,
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.1)"}`
              }}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  Configuration
                </Typography>
                <IconButton size="small" onClick={() => setSelectedNode(null)} style={{ color: "white" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
              
              <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 8, background: selectedNode.color,
                    display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                    fontWeight: "bold", fontSize: 24
                  }}>
                    {selectedNode.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <Typography variant="h6">{selectedNode.name}</Typography>
                    <Typography variant="caption" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {selectedNode.category}
                    </Typography>
                  </div>
                </div>

                <TextField
                  fullWidth
                  label="Node Name"
                  size="small"
                  variant="outlined"
                  value={selectedNode.name}
                  InputLabelProps={{ style: { color: "rgba(255,255,255,0.6)" } }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ marginBottom: 20 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                    }
                  }}
                />

                <Typography variant="body2" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                  Action
                </Typography>
                <TextField
                  fullWidth
                  select
                  size="small"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  InputProps={{ style: { color: "white" } }}
                  style={{ marginBottom: 20 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                    }
                  }}
                >
                  <option value="default" style={{ color: "black" }}>Execute Default Action</option>
                  <option value="test" style={{ color: "black" }}>Test Connection</option>
                  <option value="get" style={{ color: "black" }}>Get Details</option>
                </TextField>

                <Divider style={{ background: "rgba(255,255,255,0.1)", margin: "20px 0" }} />
                
                <Typography variant="body2" style={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
                  Real configuration options will be loaded here.
                </Typography>
              </div>
            </div>
          )}

        </div>

        {/* Drag Overlay for visual feedback */}
        <DragOverlay dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          {activeId && activeId.startsWith('sidebar-') && activeApp ? (
            <div style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "12px",
              borderRadius: "8px", background: theme?.palette?.surfaceColor || "#1e1e1e",
              border: `2px solid ${theme?.palette?.primary?.main || "#FF8544"}`,
              boxShadow: "0 12px 24px rgba(0,0,0,0.5)",
              color: "white", width: "240px", opacity: 0.9,
            }}>
               <div style={{
                  width: "32px", height: "32px", borderRadius: "8px", background: activeApp.color,
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                  fontWeight: "bold", fontSize: "16px", flexShrink: 0
                }}>
                  {activeApp.name.charAt(0).toUpperCase()}
                </div>
                <Typography variant="body2" style={{ fontWeight: 600 }}>{activeApp.name}</Typography>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default WorkflowBuilder;
