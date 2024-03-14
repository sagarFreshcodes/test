export const ButtonLoader = () => {
  return (
    <>
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only"></span>
      </div>
    </>
  );
};

export const CommonButtom = ({ loader, lable, attr, type }) => {
  return (
    <button className={`btn btn-${type ?? "success"}`} {...attr}>
      {loader ? <ButtonLoader /> : ""}
      <span>{lable ?? "Submit"}</span>
    </button>
  );
};

export const ManageComponent = ({
  list,
  content,
  noFoundMessage,
  loader,
  loaderComponent,
}) => {
  return (
    <>
      {list && list?.length === 0 ? (
        <>
          {" "}
          {loader ? (
            <>
              {loaderComponent ?? (
                <>
                  <div class="cs_iconbox_8_wrap cs_radius_30 NoRecordBox w-100">
                    <h3> {`Loading...`}</h3>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div
                class="cs_iconbox_8_wrap cs_radius_30 NoRecordBox"
                onClick={() => console.log(list)}
              >
                <h3> {noFoundMessage ?? `No Record Found`}</h3>
              </div>
            </>
          )}
        </>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

export const Card1 = ({ children, title }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        {children}
      </div>
    </div>
  );
};

export default Card1;
