import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold mb-8">daisyUI Test Page</h1>

      {/* Test 1: Buttons - if these have daisyUI styling, it's working */}
      <div className="space-x-2 mb-8">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-outline">Outline</button>
      </div>

      {/* Test 2: Alert components */}
      <div className="space-y-2 mb-8">
        <div className="alert alert-info">Info alert - daisyUI is working!</div>
        <div className="alert alert-success">
          Success alert - daisyUI is working!
        </div>
        <div className="alert alert-warning">
          Warning alert - daisyUI is working!
        </div>
        <div className="alert alert-error">
          Error alert - daisyUI is working!
        </div>
      </div>

      {/* Test 3: Card with badge */}
      <div className="card bg-base-100 shadow-xl max-w-md">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title">daisyUI Card</h2>
            <div className="badge badge-primary">NEW</div>
          </div>
          <p>
            If you see styled buttons, alerts, and this card with a badge,
            daisyUI is installed correctly!
          </p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-ghost">Decline</button>
          </div>
        </div>
      </div>

      {/* Test 4: Loading spinner */}
      <div className="mt-8 flex items-center gap-4">
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ball loading-md"></span>
      </div>
    </div>
  );
}

export default App;
