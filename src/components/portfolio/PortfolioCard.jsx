import "./PortfolioCard.css";

const PortfolioCard = ({ project, onDelete, onEdit }) => {
    if (!project) {
      return null;
    }
    return (
      <div className="portfolioCard-section">
        <div className="portfolioCard-content">
          <div className="portfolioCard-photoArea">
            {project.photo ? (
              <img src={project.photo} alt={project.name} className="portfolio-photo" />
            ) : (
              "Фото отсутствует"
            )}
          </div>
          <div className="portfolioCard-title">{project.name || "Название отсутствует"}</div>
          <div className="portfolioCard-description">
            {project.description || "Описание отсутствует"}
          </div>
          <div className="portfolioCard-btnsArea">
            <button className="btn-edit" onClick={onEdit}>
              Редактировать
            </button>
            
            <button className="btn-delete" onClick={onDelete}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    );
  };
  
 
export default PortfolioCard;