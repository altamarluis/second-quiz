import './noQueryStyle.css';
function NoQuery({ queryMessage }) { //handles text shown when there is no query
  return (
    <div className="no-query container">
      <div className="no-query">
        <h3>{ queryMessage }</h3>
      </div>
    </div>
  );
}

export { NoQuery };