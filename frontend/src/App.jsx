import { useState } from "react";

import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="text-2xl font-bold">Hello World</p>
      <Button className="bg-red-500 text-white">Click</Button>
    </div>
  );
}

export default App;
