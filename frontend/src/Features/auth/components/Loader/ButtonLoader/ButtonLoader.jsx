import './ButtonLoader.scss'

export const ButtonLoader = ({ loading, text = "Submit", loadingText = "loading...", type = "button", onClick, className = "" }) => {

    return (
        <button
            type={type}
            disabled={loading}
            onClick={onClick}
            className={`btn ${className}`}
        >
            {
                loading ? (
                    <>
                        <span className="spinner"></span>
                        {loadingText}
                    </>
                ) :
                    (
                        text
                    )
            }


        </button>
    )

}