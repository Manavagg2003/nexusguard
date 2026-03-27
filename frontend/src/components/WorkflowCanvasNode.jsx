import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Delete as DeleteIcon, Settings as SettingsIcon } from "@mui/icons-material";

const WorkflowCanvasNode = ({ id, node, onDelete, onConfigure, isSelected, theme }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isHovered, setIsHovered] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "280px",
    padding: "12px 16px",
    marginBottom: "16px",
    borderRadius: "8px",
    background: theme?.palette?.surfaceColor || "#1e1e1e",
    border: isSelected 
      ? `2px solid ${theme?.palette?.primary?.main || "#FF8544"}`
      : `1px solid ${theme?.palette?.inputColor || "rgba(255,255,255,0.1)"}`,
    boxShadow: isDragging ? "0 8px 16px rgba(0,0,0,0.4)" : "0 4px 6px rgba(0,0,0,0.1)",
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 2 : 1,
  };

  const getFallbackIcon = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      role="button"
      tabIndex={0}
      onClick={() => onConfigure(node)}
      onKeyDown={(e) => {
        if (listeners && listeners.onKeyDown) {
          listeners.onKeyDown(e);
        }
        if (e.key === "Enter" || e.key === " ") {
          if (e.key === " ") e.preventDefault();
          onConfigure(node);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual connector points */}
      <div style={{
        position: "absolute",
        left: "-6px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: theme?.palette?.primary?.main || "#FF8544",
        border: "2px solid #222"
      }} />
      <div style={{
        position: "absolute",
        right: "-6px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: theme?.palette?.primary?.main || "#FF8544",
        border: "2px solid #222"
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: node.color || "#444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px"
        }}>
          {node.iconUrl ? (
            <img src={node.iconUrl} alt={node.name} style={{ width: "24px", height: "24px", objectFit: "contain" }} />
          ) : (
            getFallbackIcon(node.name)
          )}
        </div>
        <div>
          <Typography variant="body1" style={{ fontWeight: 600, color: "white" }}>
            {node.name}
          </Typography>
          <Typography variant="caption" style={{ color: "rgba(255,255,255,0.6)" }}>
            {node.category}
          </Typography>
        </div>
      </div>

      <div 
        className="action-buttons"
        style={{ 
          display: "flex", 
          gap: "4px",
          opacity: isSelected || isHovered ? 1 : 0, 
          transition: "opacity 0.2s"
        }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Tooltip title="Delete Node">
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }} 
            style={{ color: "#ff4d4f" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default WorkflowCanvasNode;
