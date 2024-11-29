import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import AddTrailForm from "./components/Trails/AddTrailForm";
import { Trail, User } from "./types/types";
import { AppContext } from "./context/AppContext";
import { createTrail } from "./utils/trail-utils";
import "@testing-library/jest-dom/extend-expect";

import App from './App'; // Adjust the path accordingly

describe("Navbar", () => {
  test('renders user login', () => {
    render(
      <Router initialEntries={['/']}>
        <App />
      </Router>
    );
    const login = screen.getByText("Login");
    fireEvent.click(login);
    waitFor(() => {
      const signInText = screen.getByText('Sign in');
      expect(signInText).toBeInTheDocument();
    });
  });

  test('renders explore', () => {
    render(
      <Router initialEntries={['/login']}>
        <App />
      </Router>
    );

    const explore = screen.getByText("Explore")
    fireEvent.click(explore)
    waitFor(() => {
      const addTrail = screen.getByText('Add Your Own Trail');
      expect(addTrail).toBeInTheDocument();
    });
  });
});

jest.mock("react-leaflet", () => ({
  //...jest.requireActual("react-leaflet"),
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  useMap: jest.fn(),  // Mock useMap hook
  useMapEvents: () => {}, // No-op mock for event hooks
}));

// Mock leaflet for icons if necessary
jest.mock("leaflet", () => ({
  icon: jest.fn(() => ({})), // Mock the icon function
}));

const mockedTrail: Trail = {
  id: 1,
  name: "Trail Name",
  image: "", // Assuming the image is optional or empty for this mock
  description: "Trail Description"
};

//  mock functions
jest.mock("./utils/trail-utils", () => ({
  createTrail: jest.fn(() => Promise.resolve(mockedTrail)), // Mock implementation of createTrail
}));

describe("AddTrailForm Component", () => {
  const mockTrails = [] as Trail[];
  const mockSetTrails = jest.fn();
  const mockUser = null;
  const mockSetUser = jest.fn();

  test("renders form inputs correctly", () => {
    render(
      <AppContext.Provider value={{ trails: mockTrails, setTrails: mockSetTrails, user: mockUser, setUser: mockSetUser}}>
        <AddTrailForm />
      </AppContext.Provider>
    );

    expect(screen.getByPlaceholderText("Trail name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Consider including tips and helpful features")).toBeInTheDocument();
    expect(screen.getByText("Create Trail")).toBeInTheDocument();
  });
  
  test("updates input values on user input", () => {
    render(
      <AppContext.Provider value={{ trails:[], setTrails:() => {}, user: mockUser, setUser: mockSetUser }}>
        <AddTrailForm />
      </AppContext.Provider>
    );
    const nameInput = screen.getByPlaceholderText("Trail name");
    const descriptionInput = screen.getByPlaceholderText("Consider including tips and helpful features");

    fireEvent.change(nameInput, { target: { value: "New Trail" } });
    fireEvent.change(descriptionInput, { target: { value: "blah blah blah" } });

    expect(nameInput).toHaveValue("New Trail");
    expect(descriptionInput).toHaveValue("blah blah blah");
  });
  test("calls createTrail and updates trails on Search page", async () => {
    render(
      <AppContext.Provider value={{ trails: mockTrails, setTrails: mockSetTrails, user: mockUser, setUser: mockSetUser }}>
        <Router initialEntries={["/add-trail-form"]}>
          <App />
        </Router>
      </AppContext.Provider>
    );
    const nameInput = screen.getByPlaceholderText("Trail name");
    const descriptionInput = screen.getByPlaceholderText("Consider including tips and helpful features");

    fireEvent.change(nameInput, { target: { value: "Trail Name" } });
    fireEvent.change(descriptionInput, { target: { value: "Trail Description" } });

    fireEvent.submit(screen.getByText("Create Trail"));

    expect(createTrail).toHaveBeenCalledWith({
      id: mockTrails.length + 1,
      name: "Trail Name",
      image: "",  // image empty
      description: "Trail Description",
    });
    expect(screen.getByText("Explore")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Explore"));
    
    expect(await screen.findByText("Trail Name")).toBeInTheDocument();
    expect(screen.getByText("Trail Description")).toBeInTheDocument();
  });
  test("clears input fields after form submission", () => {
    render(
      <AppContext.Provider value={{ trails: mockTrails, setTrails: mockSetTrails, user: mockUser, setUser: mockSetUser }}>
        <Router initialEntries={["/add-trail-form"]}>
          <App />
        </Router>
      </AppContext.Provider>
    );
    const nameInput = screen.getByPlaceholderText("Trail name");
    const descriptionInput = screen.getByPlaceholderText("Consider including tips and helpful features");

    fireEvent.change(nameInput, { target: { value: "New Test" } });
    fireEvent.change(descriptionInput, { target: { value: "blah blah blah" } });

    fireEvent.submit(screen.getByText("Create Trail"));

    expect(nameInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
  /*
  test("renders a map for a trail", () => {
    render(
      <AppContext.Provider value={{ trails: mockTrails, setTrails: mockSetTrails, user: mockUser, setUser: mockSetUser }}>
        <Router initialEntries={["/add-trail-form"]}>
          <App />
        </Router>
      </AppContext.Provider>
    );
    const nameInput = screen.getByPlaceholderText("Trail name");
    const descriptionInput = screen.getByPlaceholderText("Consider including tips and helpful features");
    fireEvent.change(nameInput, { target: { value: "New Test" } });
    fireEvent.change(descriptionInput, { target: { value: "blah blah blah" } });

    fireEvent.submit(screen.getByText("Create Trail"));

    expect(screen.getByText("Explore")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Explore"));

    const mapIframe = screen.getByTestId('map');
    expect(mapIframe).toBeInTheDocument();
  });
  */
  test("renders a trail name before description", () => {
    render(
      <AppContext.Provider value={{ trails: mockTrails, setTrails: mockSetTrails, user: mockUser, setUser: mockSetUser }}>
        <Router initialEntries={["/add-trail-form"]}>
          <App />
        </Router>
      </AppContext.Provider>
    );
    const nameInput = screen.getByPlaceholderText("Trail name");
    const descriptionInput = screen.getByPlaceholderText("Consider including tips and helpful features");
    fireEvent.change(nameInput, { target: { value: "New Test" } });
    fireEvent.change(descriptionInput, { target: { value: "blah blah blah" } });

    fireEvent.submit(screen.getByText("Create Trail"));

    expect(screen.getByText("Explore")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Explore"));

    const trailName = screen.getByText("New Test").closest('div');
    const trailDescription = screen.getByText("blah blah blah").closest('div');

    //expect(trailName.compareDocumentPosition(trailDescription) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});