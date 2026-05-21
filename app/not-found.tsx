"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');
        
        .not-found-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Lato', sans-serif;
          position: relative;
        }
        
        .top {
          margin-top: 30px;
        }
        
        .ghost-container {
          margin: 0 auto;
          position: relative;
          width: 250px;
          height: 250px;
          margin-top: -40px;
        }
        
        .ghost {
          width: 50%;
          height: 53%;
          left: 25%;
          top: 10%;
          position: absolute;
          border-radius: 50% 50% 0 0;
          background: #EDEDED;
          border: 1px solid #BFC0C0;
          border-bottom: none;
          animation: float 2s ease-out infinite;
        }
        
        .ghost-copy {
          width: 50%;
          height: 53%;
          left: 25%;
          top: 10%;
          position: absolute;
          border-radius: 50% 50% 0 0;
          background: #EDEDED;
          border: 1px solid #BFC0C0;
          border-bottom: none;
          animation: float 2s ease-out infinite;
          z-index: 0;
        }
        
        .face {
          position: absolute;
          width: 100%;
          height: 60%;
          top: 20%;
        }
        .eye, .eye-right {
          position: absolute;
          background: #585959;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          top: 40%;
        }
        
        .eye {
          left: 25%;
        }
        .eye-right {
          right: 25%;
        }
        
        .mouth {
          position:absolute;
          top: 50%;
          left: 45%;
          width: 10px;
          height: 10px;
          border: 3px solid;
          border-radius: 50%;
          border-color: transparent #585959 #585959 transparent;
          transform: rotate(45deg);
        }
        
        .one, .two, .three, .four {
          position: absolute;
          background: #EDEDED;
          top: 85%;
          width: 25%;
          height: 23%;
          border: 1px solid #BFC0C0;
          z-index: 0;
        }
        
        .one {
          border-radius: 0 0 100% 30%;
          left: -1px;
        }
        
        .two {
          left: 23%;
          border-radius: 0 0 50% 50%;
        }
        
        .three {
          left: 50%;
          border-radius: 0 0 50% 50%;
        }
        
        .four {
          left: 74.5%;
          border-radius: 0 0 30% 100%;
        }
        
        .shadow {
          position: absolute;
          width: 30%;
          height: 7%;
          background: #BFC0C0;
          left: 35%;
          top: 80%;
          border-radius: 50%;
          animation: scale 2s infinite;
        }
        
        @keyframes scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          50% { transform: translateY(15px); }
        }
        
        .bottom {
          margin-top: 10px;
        }
        
        .title-404 {
          font-family: 'Abril Fatface', serif;
          color: #EDEDED;
          text-align: center;
          font-size: 9em;
          margin: 0;
          text-shadow: -1px 0 #BFC0C0, 0 1px #BFC0C0, 1px 0 #BFC0C0, 0 -1px #BFC0C0;
        }
        .subtitle-404 {
          font-family: 'Lato', sans-serif;
          font-size: 2em;
          text-transform: uppercase;
          text-align: center;
          color: #BFC0C0;
          margin-top: -20px;
          font-weight: 900;
        }
        .text-404 {
          text-align: center;
          font-family: 'Lato', sans-serif;
          color: #585959;
          font-size: .6em;
          margin-top: -20px;
          text-transform: uppercase;
        }
        
        .search {
          text-align: center;
          position: relative;
          display: flex;
          justify-content: center;
        }
        
        .buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
        
        .search-bar {
          border: 1px solid #BFC0C0;
          padding: 5px;
          height: 32px;
          width: 200px;
          outline: none;
          box-sizing: border-box;
          font-family: 'Lato', sans-serif;
        }
        .search-bar:focus {
          border: 1px solid #D3DEEA;
        }
        
        .search-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #BFC0C0;
          background: #BFC0C0;
          text-align: center;
          color: #EDEDED;
          cursor: pointer;
          font-size: 1em;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-btn:hover {
          background: #EDEDED;
          border: 1px solid #EDEDED;
          color: #BFC0C0;
          transition: all .2s ease;
        }
        
        .btn {
          background: #EDEDED;
          padding: 15px 20px;
          margin: 5px;
          color: #585959;
          font-family: 'Lato', sans-serif;
          text-transform: uppercase;
          font-size: .6em;
          letter-spacing: 1px;
          border: 0;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          z-index: 10;
        }
        .btn:hover {
          background: #BFC0C0;
          transition: all .4s ease-out;
        }
        
        .footer-404 {
          position: absolute;
          bottom: 0;
          right: 0;
          text-align: center;
          font-size: 0.8em;
          text-transform: uppercase;
          padding: 10px;
          color: #EA7996;
          letter-spacing: 3px;
          font-family: 'Lato', sans-serif;
        }
        .footer-404 a {
          color: #ffffff;
          text-decoration: none;
        }
        .footer-404 a:hover {
          color: #7d7d7d;
        }
      `}} />

      <div className="not-found-container">
        <div className="top">
          <h1 className="title-404">404</h1>
          <h3 className="subtitle-404">page not found</h3>
        </div>
        <div className="ghost-container">
          <div className="ghost-copy">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
          </div>
          <div className="ghost">
            <div className="face">
              <div className="eye"></div>
              <div className="eye-right"></div>
              <div className="mouth"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
        <div className="bottom">
          <div className="buttons">
            <button className="btn" onClick={() => router.back()}>Back</button>
            <Link href="/" className="btn">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
