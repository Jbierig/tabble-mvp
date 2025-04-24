
// Tabble MVP — Customer Cart Sidebar with Add to Cart Functionality

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// ... full code will be inserted here, shortened in this preview for clarity

export default function TabbleMenu() {
  return (
    <Router>
      <TabbleMenuContent />
    </Router>
  );
}
