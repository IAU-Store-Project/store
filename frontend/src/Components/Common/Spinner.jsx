import React from "react";

const Spinner = () => {
	return (
			<React.Fragment>
				<div className="row">
					<div className="col-12 text-center">

						<div className="d-flex justify-content-center">
							<div className="spinner-border m-5" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>

					</div>
				</div>
			</React.Fragment>
	);
};

export default Spinner;
