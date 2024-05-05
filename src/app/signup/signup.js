"use client";
import { useState } from "react";
import { Grid } from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91.5vh",
        backgroundColor: "#000000",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          backgroundColor: "#444",
          padding: "40px",
          borderRadius: "15px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}
        >
          Movie Reviews
        </h1>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
          }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
          }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "grey",
            color: "white",
            border: "none",
            backgroundColor: "#000000",
            borderRadius: "20px",
          }}
        >
          Confirm
        </button>
      </form>
    </Grid>
  );
}
