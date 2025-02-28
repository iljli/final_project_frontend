const SensorSideNavCard = ({ id, name, picture }) => {
  return (
    <li className="collection-item avatar ">
      <div class="row sensor-container">
        <div class="col s3">
          <img src={picture} alt="" className="circle" id="sensor-image" />
        </div>
        <div class="col s9">
          <h5 className="sensor-title">{name}</h5>
          <button
            className="btn waves-effect waves-light light-blue darken-3"
            type="submit"
            name="action"
          >
            Visualise
            <i className="material-icons right">insights</i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default SensorSideNavCard;
