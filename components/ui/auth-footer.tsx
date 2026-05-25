import * as React from "react";

export function AuthFooter() {
  return (
    <footer className="text-center text-[10px] text-gray-400 mt-12 w-full max-w-xl">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span>&copy; 2025 Peoplely HR. All rights reserved.</span>
        <div className="flex gap-3">
          <a href="#" className="hover:underline font-medium">Terms &amp; Conditions</a>
          <a href="#" className="hover:underline font-medium">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
