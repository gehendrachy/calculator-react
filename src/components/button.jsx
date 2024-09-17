const Button = (props) => {
    const runCommand = props.runCommand;
    const btnClass = props.btnClass;
    const name = props.name;

    return (
        <div onClick={ () => runCommand(name) } className={btnClass} >{ name }</div>
    )
}

export default Button;