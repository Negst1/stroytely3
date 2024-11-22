import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Services from "./components/services/Services";
import CreateService from "./components/create-service/CreateService";
import EditService from "./components/edit-service/EditService";
import PortfolioMainArea from "./components/portfolio-main/PortfolioMainArea";
import "./App.css";
import CreatePortfolio from "./components/create-portfolio/CreatePortfolio";


function App() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProject] = useState([]); // изменение состояния портфолио


  const savePortfolio = (project) => {
    if (project.id) {
      // Обновление существующего проекта
      setProject((prevProjects) =>
        prevProjects.map((p) => (p.id === project.id ? project : p))
      );
    } else {
      // Добавление нового проекта
      setProject((prevProjects) => [
        ...prevProjects,
        { ...project, id: Date.now() }, // Добавляем проект с уникальным id
      ]);
    }
    setEditingProject(null);
  };

  //удаление проекта из списка

  const deleteProject = (id) => {
    setProject((prevProject) => prevProject.filter
    ((project) => project.id !== id));
  }

  // Добавление или обновление услуги
  const saveService = (service) => {
    if (service.id) {
      // Обновление существующей услуги
      setServices((prevServices) =>
        prevServices.map((s) => (s.id === service.id ? service : s))
      );
    } else {
      // Добавление новой услуги
      setServices((prevServices) => [
        ...prevServices,
        { ...service, id: Date.now() },
      ]);
    }
  };

  // Удаление услуги
  const deleteService = (id) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  return (
    <div className="App">
      <div className="sidebar-wrap">
        <Sidebar />
      </div>
      <div className="content">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route
              path="services"
              element={
                <Services
                  services={services}
                  deleteService={deleteService}
                  setEditingService={setEditingService}
                />
              }
            />

            <Route 
              path="portfolio"
              element={<PortfolioMainArea
                projects={projects}
                deleteProject={deleteProject}
                setEditingProject={setEditingProject}
              />}
            />

            <Route path="create-project" 
            element={
              <CreatePortfolio
                savePortfolio={savePortfolio}
                editingProject={editingProject}
                setEditingProject={setEditingProject}
              />
            }>

            </Route>

            <Route
              path="create-services"
              element={
                <CreateService
                  saveService={saveService}
                  editingService={editingService}
                  setEditingService={setEditingService}
                />
              }
            />



            <Route
                path="edit-service/:id"
                element={
                  <EditService
                    saveService={saveService}
                    editingService={editingService}
                    setEditingService={setEditingService}
                  />
                }
              />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
