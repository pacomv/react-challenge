import { AccommodationForm } from "./components/AccommodationForm";
import "@/index.css";
import { Card, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="flex flex-col h-screen text-center my-0 items-center justify-center mx-auto max-w-[80ch] bg-background">
      <div className="h-full w-full p-8">
        <Card className="h-[850px] w-full">
          <CardContent className="h-full w-full">
            <AccommodationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
