import "./CreatePortfolio.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePortfolio = ({ savePortfolio, editingProject, setEditingProject }) => {
  // Локальные состояния для управления полями
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // Синхронизация локального состояния с `editingProject`
  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name || "");
      setDescription(editingProject.description || "");
      setPhoto(editingProject.photo || null);
      console.log(editingProject);
    } else {
      resetForm();
    }
  }, [editingProject]);

  // Функция сброса формы
  const resetForm = () => {
    setName("");
    setPhoto(null);
    setDescription("");
  };

  // Обработка изменения фото
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickSave = () => {
    const newPortfolio = {
      id: editingProject?.id || null,
      name,
      photo,
      description,
    };
    
    savePortfolio(newPortfolio);
  
    // Очищаем форму
    setName("");
    setDescription("");
    setPhoto(null);
    setEditingProject(null);
  
    navigate("/portfolio");
  };
  

  // Отмена редактирования
  const handleClickCancel = () => {
    setEditingProject(null); // Сбрасываем редактируемый проект
    resetForm(); // Сбрасываем локальное состояние
    navigate("/portfolio"); // Переходим на страницу портфолио
  };

  return (
    <div className="createPortfolio-section">
      <div className="createPortfolio-content">
        <div className="createPortfolio-title title">
          {editingProject ? "Редактировать проект" : "Создать проект"}
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Наименование проекта*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            placeholder="Введите наименование проекта"
          />
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Фото проекта</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="photo-input"
          />
          {photo && <img src={photo} alt="Превью" className="photo-preview" />}
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Описание проекта</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            placeholder="Введите описание проекта"
          />
        </div>

        <div className="createPortfolio-buttons">
          <button className="btn cancel" onClick={handleClickCancel}>
            Отмена
          </button>
          <button className="btn save" onClick={handleClickSave}>
            {editingProject ? "Сохранить изменения" : "Создать"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio;
