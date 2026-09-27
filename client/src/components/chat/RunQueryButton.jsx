function RunQueryButton({
  queryId,
  onRunQuery,
  isRunning,
}) {
  return (
    <div className="query-action">

      <div className="query-ready">

        <span className="query-icon">
          ⚡
        </span>

        <div>
          <strong>
            Query ready
          </strong>

          <small>
            Click below to retrieve the results
          </small>
        </div>

      </div>

      <button
        className="run-query-button"
        onClick={() =>
          onRunQuery(queryId)
        }
        disabled={isRunning}
      >

        {isRunning ? (
          <>
            <span className="spinner"></span>
            Running...
          </>
        ) : (
          <>
            🔥 Run Query
          </>
        )}

      </button>

    </div>
  );
}

export default RunQueryButton;