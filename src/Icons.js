export const BackIcon = (props)=>{
    const {height,width,color='#ffffff',...rest} = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 24 24" {...rest}><path fill='none' d="M0 0h24v24H0V0z" opacity=".9"/><path fill={color} d="M16.6 3c-.5-.5-1.3-.5-1.8 0l-8.3 8.3a1 1 0 000 1.4l8.3 8.3a1.2 1.2 0 101.8-1.7L9.4 12l7.2-7.3c.5-.4.5-1.2 0-1.7z"/></svg>
    )
}