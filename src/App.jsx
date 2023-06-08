import { useState } from "react";
import {createRoot} from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient ({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
})
//queryClient is the new way to make api calls and can minimuse use of use effect
//wrap the app inside of it and then the information can be passed to the components
//staletime and cachetime can be changed to minutes/seconds depending on when it should refresh 

const App = () => {
  const adoptedPet = useState(null)
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
//create root comes form react dom, it is the new way to render to the dom
root.render(<App />)
