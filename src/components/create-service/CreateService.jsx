import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateService.css";
import ErrorWindow from "../error-window/ErrorWindow";

const CreateService = ({ saveService, editingService, setEditingService }) => {
    const [name, setName] = useState("");
    const [paymentType, setPaymentType] = useState("agreement");
    const [price, setPrice] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    

    useEffect(() => {
      if (editingService) {
        setName(editingService.name);
        setPaymentType(editingService.paymentType || "agreement");
        setPrice(editingService.price || "");
        setIsActive(editingService.isActive);
      }
    }, [editingService]);
  
    const validateForm = () => {
      const newErrors = {};
      if (!name) newErrors.name = "Наименование услуги обязательно";
      
      if ((paymentType === "hourly" || paymentType === "volume") && !price) {
        newErrors.price = "Укажите сумму оплаты";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
      if (!validateForm()) return;
  
      const newService = {
        id: editingService?.id || null,
        name,
        paymentType,
        price: paymentType === "agreement" ? null : price,
        isActive,
      };
  
      saveService(newService);
      setEditingService(null);
      navigate("/services");
    };
  
    const handleCancel = () => {
      setEditingService(null);
      navigate("/services");
    };

  return (
    <section className="createServices-section">

      <div className="createServices-content">
        <div className="createServices-title">
          {editingService ? "Редактирование услуги" : "Создание услуги"}
        </div>

        <div className="createServices-wrap">
          {/* Поле наименования */}
          
          
          <div className="nameService-content">
                <div className="nameService-wrap">
                    <label className="nameService-label">
                      Наименование услуги*
                    </label>
                    <div className="labelAndError-wrap">
                    <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`nameService-input ${errors.name ? "error" : ""}`}
                    placeholder="Введите наименование услуги"
                    />
                  
                  {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                </div>
            </div>
              
            {/* Тип и сумма оплаты */}
            <div className="typeAndSumm-content">
              <label className="typeAndSumm-title">Тип и сумма оплаты*</label>
              <div className="labelsError-wrap">
              <div className="typeAndSumm-labels">
                
                <label className="typeAndSumm-label">
                  <div className="typeAndSumm-checkbox__border">
                    <input
                      type="radio"
                      checked={paymentType === "agreement"}
                      onChange={() => {
                        setPaymentType("agreement");
                        setPrice("");
                      }}
                    />
                    </div>
                    По договоренности
                </label>
                <label className="typeAndSumm-label">
                  <div className="typeAndSumm-checkbox__border">
                    <input
                      type="radio"
                      checked={paymentType === "hourly"}
                      onChange={() => setPaymentType("hourly")}
                    />
                  </div>
                  Почасовая оплата
                  {paymentType === "hourly" && (
                  
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`typeAndSumm-input ${errors.price ? "error" : ""}`}
                      placeholder="Сумма ($/час)"
                    />
                  )}
                </label>
                <label className="typeAndSumm-label">
                  <div className="typeAndSumm-checkbox__border">
                    <input
                      type="radio"
                      checked={paymentType === "volume"}
                      onChange={() => setPaymentType("volume")}
                    />
                  </div>
                  Оплата по объему работ
                  {paymentType === "volume" && (
                    <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`typeAndSumm-input ${errors.price ? "error" : ""}`}
                      placeholder="Сумма ($)"
                      />
                  )}
                </label>
              
              </div>
              {errors.price && <span className="error-text">{errors.price}</span>}
              </div>
            </div>

            {/* Переключатель активности */}

            <div className="beActive-content">
              <label className="beActive-title">
                Активность
                  <div className="switch">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />               
                    <span className="slider"></span>
                  </div>
                </label>
            </div>
            
          </div>
        {/* Кнопки */}
        <div className="createService-btnsArea">
          <div className="btn-cancel__border">
            <button
              className="createService-btn cancel"
              onClick={handleCancel}
            >
              Отмена
            </button>
          </div>
          <div className="btn-save__border">
            <button className="createService-btn save" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>

        {/* Окно с  ошибками */}

      </div>
    </section>
  );
};

export default CreateService;
