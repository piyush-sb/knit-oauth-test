import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const Authorize = React.lazy(() => import("./pages/Authorize"));
const MyKnit = React.lazy(() => import("./pages/MyKnitWebClient"));
const AdminAuth = React.lazy(() => import("./pages/AdminAuth"));
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MyKnit />} />
          <Route path="/oauth/authorize" element={<Authorize />} />
          <Route path="/admin/authorize" element={<AdminAuth />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
