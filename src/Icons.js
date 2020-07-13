export const BackIcon = (props)=>{
    const {height,width,color='#ffffff',...rest} = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 24 24" {...rest}><path fill='none' d="M0 0h24v24H0V0z" opacity=".9"/><path fill={color} d="M16.6 3c-.5-.5-1.3-.5-1.8 0l-8.3 8.3a1 1 0 000 1.4l8.3 8.3a1.2 1.2 0 101.8-1.7L9.4 12l7.2-7.3c.5-.4.5-1.2 0-1.7z"/></svg>
    )
}

export const HamburgerIcon = (props)=>{
    const {height,width,color='#ffffff',...rest} = props;
    return (
        <svg className="svg-icon" height={height} width={width} viewBox="0 0 20 20" {...rest}>
        <path fill={color} d="M1.321,3.417h17.024C18.707,3.417,19,3.124,19,2.762c0-0.362-0.293-0.655-0.654-0.655H1.321
            c-0.362,0-0.655,0.293-0.655,0.655C0.667,3.124,0.959,3.417,1.321,3.417z M18.346,15.857H8.523c-0.361,0-0.655,0.293-0.655,0.654
            c0,0.362,0.293,0.655,0.655,0.655h9.822c0.361,0,0.654-0.293,0.654-0.655C19,16.15,18.707,15.857,18.346,15.857z M18.346,11.274
            H1.321c-0.362,0-0.655,0.292-0.655,0.654s0.292,0.654,0.655,0.654h17.024c0.361,0,0.654-0.292,0.654-0.654
            S18.707,11.274,18.346,11.274z M18.346,6.69H6.56c-0.362,0-0.655,0.293-0.655,0.655C5.904,7.708,6.198,8,6.56,8h11.786
            C18.707,8,19,7.708,19,7.345C19,6.983,18.707,6.69,18.346,6.69z"></path>
    </svg>
    )
}

export const NotifIcon = (props)=>{
    const {height,width,color='#ffffff',...rest} = props;
    return(
        <svg className="svg-icon" height={height} width={width}  {...rest} viewBox="0 0 20 20">
            <path fill={color} d="M14.38,3.467l0.232-0.633c0.086-0.226-0.031-0.477-0.264-0.559c-0.229-0.081-0.48,0.033-0.562,0.262l-0.234,0.631C10.695,2.38,7.648,3.89,6.616,6.689l-1.447,3.93l-2.664,1.227c-0.354,0.166-0.337,0.672,0.035,0.805l4.811,1.729c-0.19,1.119,0.445,2.25,1.561,2.65c1.119,0.402,2.341-0.059,2.923-1.039l4.811,1.73c0,0.002,0.002,0.002,0.002,0.002c0.23,0.082,0.484-0.033,0.568-0.262c0.049-0.129,0.029-0.266-0.041-0.377l-1.219-2.586l1.447-3.932C18.435,7.768,17.085,4.676,14.38,3.467 M9.215,16.211c-0.658-0.234-1.054-0.869-1.014-1.523l2.784,0.998C10.588,16.215,9.871,16.447,9.215,16.211 M16.573,10.27l-1.51,4.1c-0.041,0.107-0.037,0.227,0.012,0.33l0.871,1.844l-4.184-1.506l-3.734-1.342l-4.185-1.504l1.864-0.857c0.104-0.049,0.188-0.139,0.229-0.248l1.51-4.098c0.916-2.487,3.708-3.773,6.222-2.868C16.187,5.024,17.489,7.783,16.573,10.27"></path>
        </svg>
    )
}

export const SearchIcon = (props)=>{
    const {height,width,color='#ffffff',...rest} = props;
    return(
        <svg className="svg-icon" height={height} width={width}  {...rest} viewBox="0 0 20 20">
            <path fill={color} d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
                c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
                c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
                s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"></path>
        </svg>
    )
}

export const RupeeIcon =(props)=>{
    const {height,width,color='#ffffff',...rest} = props;
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" height={height} width={width}  {...rest} viewBox='0 0 402 402'><path fill={color} d="M327 91c-2-2-4-2-7-2h-49c-3-16-9-30-18-42h66c3 0 5 0 7-2s3-4 3-7V9c0-3-1-5-3-6-2-2-4-3-7-3H82c-3 0-5 1-7 3l-2 6v38c0 3 1 5 3 7s3 2 6 2h41c40 0 66 11 77 33H82c-3 0-5 0-7 2l-2 7v29l2 6c2 2 4 3 7 3h122c-4 16-14 27-29 36-16 8-36 12-61 12H82c-3 0-5 1-6 3-2 1-3 4-3 6v36l2 7c37 38 84 93 143 163 1 2 4 3 7 3h55c4 0 7-2 9-5 2-4 1-7-1-10-56-68-100-119-132-153 33-4 59-14 79-31s33-40 37-67h48c3 0 5-1 7-3l2-6V98l-2-7z"/></svg>
    )
}

export const CartIcon = (props)=>{
    const{height,width,color='#ffffff',...rest}  = props;
    return(
        <svg class="svg-icon" height={height} width={width}  {...rest} viewBox="0 0 20 20">
            <path fill={color} d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
            <path fill={color} d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
            <path fill={color} d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
        </svg>
    )
}

export const AccountIcon = (props)=>{
    const{height,width,color='#ffffff',...rest}  = props;
    return (
        <svg class="svg-icon" height={height} width={width}  {...rest}  viewBox="0 0 20 20">
            <path fill={color} d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
        </svg>
    )
}

export const VegIcon = (props) => {
    const { height, width, ...rest } = props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width}
        height={props.height}
        viewBox="0 0 14 14"
        {...rest}
      >
        <g fill="none" fill-rule="evenodd" transform="translate(0 1)">
          <rect
            width="12.4"
            height="12.2"
            x=".5"
            y=".5"
            fill="#FFF"
            stroke="#339A33"
            stroke-width=".9"
            rx="2"
          />
          <rect width="8" height="7.8" x="2.7" y="2.6" fill="#339A33" rx="3.9" />
        </g>
      </svg>
    );
  };
  
  export const NonVegIcon = (props) => {
    const { height, width, ...rest } = props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width}
        height={props.height}
        viewBox="0 0 14 14"
        {...rest}
      >
        <g fill="none" fill-rule="evenodd" transform="translate(0 1)">
          <rect
            width="12.4"
            height="12.2"
            x=".5"
            y=".5"
            fill="#FFF"
            stroke="#920E03"
            stroke-width=".9"
            rx="2"
          />
          <rect width="8" height="7.8" x="2.7" y="2.6" fill="#920E03" rx="3.9" />
        </g>
      </svg>
    );
  };


  export const ShareIcon = (props)=>{
    const{height,width,color='#ffffff',...rest}  = props;
      return (
        <svg xmlns="http://www.w3.org/2000/svg"  width={props.width}
        height={props.height} {...rest} viewBox="0 0 24 24"><path fill={color} d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"/></svg>
      )
  }

  
  export const CloseIcon = (props)=>{
    const{height,width,color='#ffffff',...rest}  = props;
      return(
        <svg class="svg-icon" width={props.width}
        height={props.height} {...rest} viewBox="0 0 20 20">
            <path fill={color} d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
        </svg>
      )
  }

  export const OrderSuccess =  (props)=>{
    const {height,width,color='#ffffff',...rest}  = props;
    return (
        <svg id="b4f32226-de22-4831-ab78-ba30a904d18e" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="0 0 722 756.57"><defs><linearGradient id="5b7f6937-2584-49b6-9aba-f63379afcef9" x1="635.65" y1="790.5" x2="635.65" y2="501.26" gradientTransform="translate(0.01 -0.01)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25"/><stop offset="0.54" stop-color="gray" stop-opacity="0.12"/><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient><linearGradient id="726273e3-a105-41c9-bd30-f21c7a222b39" x1="457.34" y1="294.83" x2="457.34" y2="145.49" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="053cf442-696d-42d1-9951-f8212c309ade" x1="591.52" y1="654.18" x2="591.52" y2="72.22" gradientTransform="translate(-238.99 -72.23)" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="47e4505a-9403-4d31-a565-d5fd2c78f1d2" x1="771.88" y1="599.91" x2="771.88" y2="322.65" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="8513435b-806a-4f93-81b8-e2b88811f111" x1="683.94" y1="827.36" x2="683.94" y2="758.36" gradientTransform="translate(-238.99 -72.23)" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="6ed55049-a466-4083-93ca-5129091d0639" x1="432.87" y1="501.19" x2="432.87" y2="377.79" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="c0dc0d70-89dc-4268-b32c-aeecea91ae40" x1="428.07" y1="603.48" x2="428.07" y2="493.95" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="484e0702-271c-4dc9-aca2-bd1f83d5b37c" x1="352.52" y1="380.93" x2="352.52" y2="201.04" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/><linearGradient id="ad7c6dc9-0e1b-446d-83eb-be41b53bfd0d" x1="442.05" y1="399.65" x2="442.05" y2="262.62" href="#5b7f6937-2584-49b6-9aba-f63379afcef9"/></defs><title>confirmed</title><circle cx="361" cy="395.57" r="297" fill="none" stroke="#3ad29f" stroke-miterlimit="10" stroke-width="2" stroke-dasharray="12"/><circle cx="361" cy="395.57" r="360" fill="none" stroke="#3ad29f" stroke-miterlimit="10" stroke-width="2" stroke-dasharray="12"/><path d="M840.94,582.47a81.21,81.21,0,0,0-161-15.14l-249.59-6.77,2.74,42.88s-35.59,82.12,151.46,104v83H800.79v-138A81.16,81.16,0,0,0,840.94,582.47Z" transform="translate(-239 -72.21)" fill="url(#5b7f6937-2584-49b6-9aba-f63379afcef9)"/><path d="M441.66,605.24s-34.08,78.64,145.05,99.62v79.52H793.8V573.79L439,564.17Z" transform="translate(-239 -72.21)" fill="#be7c5e"/><path d="M545.16,277.07h0A38.18,38.18,0,0,1,492.66,289L381.47,215.73a38.18,38.18,0,0,1-11.93-52.5h0A38.18,38.18,0,0,1,422,151.3l111.19,73.27A38.18,38.18,0,0,1,545.16,277.07Z" transform="translate(-239 -72.21)" fill="url(#726273e3-a105-41c9-bd30-f21c7a222b39)"/><path d="M539,273.07h0a35.49,35.49,0,0,1-48.8,11.09L386.81,216a35.49,35.49,0,0,1-11.09-48.8h0a35.49,35.49,0,0,1,48.8-11.09l103.37,68.12A35.49,35.49,0,0,1,539,273.07Z" transform="translate(-239 -72.21)" fill="#be7c5e"/><circle cx="515.49" cy="512.94" r="77.77" fill="#be7c5e"/><rect x="191.32" width="322.42" height="581.96" rx="12.25" ry="12.25" fill="url(#053cf442-696d-42d1-9951-f8212c309ade)"/><rect x="195.67" y="7.87" width="313.7" height="566.24" rx="13.64" ry="13.64" fill="#fff"/><path d="M670.33,94.28a25.43,25.43,0,0,1-25.07,21.63H536.92a25.43,25.43,0,0,1-25.06-21.63H454.46a11.91,11.91,0,0,0-11.92,11.91v514a11.91,11.91,0,0,0,11.91,11.92H728.59a11.91,11.91,0,0,0,11.92-11.91v-514A11.91,11.91,0,0,0,728.6,94.28Z" transform="translate(-239 -72.21)" fill="#6c63ff"/><rect x="318.01" y="28.84" width="69.91" height="4.37" rx="2" ry="2" fill="#dbdbdb"/><circle cx="402.77" cy="30.59" r="2.62" fill="#dbdbdb"/><path d="M804.76,598.87h0c-22.57,5.22-38.06-9.5-43.28-32.06L709.62,374.24a42.24,42.24,0,0,1,31.55-50.51h0a42.24,42.24,0,0,1,50.51,31.55L834,552.82C839.22,575.39,827.32,593.65,804.76,598.87Z" transform="translate(-239 -72.21)" fill="url(#47e4505a-9403-4d31-a565-d5fd2c78f1d2)"/><rect x="739.86" y="329.79" width="70.78" height="282.61" rx="35.39" ry="35.39" transform="translate(-325.18 114.47) rotate(-13.01)" fill="#be7c5e"/><rect x="296.93" y="686.15" width="296" height="69" fill="url(#8513435b-806a-4f93-81b8-e2b88811f111)"/><rect x="304.93" y="694.15" width="280" height="54" fill="#4d8af0"/><path d="M502,483.65h0a37.72,37.72,0,0,1-51.87,11.79l-74.57-48.25a37.72,37.72,0,0,1-11.79-51.87h0a37.72,37.72,0,0,1,51.87-11.79l74.57,48.25A37.72,37.72,0,0,1,502,483.65Z" transform="translate(-239 -72.21)" fill="url(#6ed55049-a466-4083-93ca-5129091d0639)"/><path d="M483.28,585.78h0a38.06,38.06,0,0,1-52.34,11.9L384.75,564a38.06,38.06,0,0,1-11.9-52.34h0a38.06,38.06,0,0,1,52.34-11.9l46.19,33.69A38.06,38.06,0,0,1,483.28,585.78Z" transform="translate(-239 -72.21)" fill="url(#c0dc0d70-89dc-4268-b32c-aeecea91ae40)"/><g opacity="0.5"><circle cx="352.52" cy="290.99" r="89.94" fill="url(#484e0702-271c-4dc9-aca2-bd1f83d5b37c)"/></g><circle cx="352.52" cy="290.99" r="84.65" fill="#69f0ae"/><polygon points="315.78 279.69 347.52 308.79 392.49 242.66 408.37 255.89 347.52 335.25 302.55 284.99 315.78 279.69" fill="#fff"/><path d="M479.55,583.27h0a35.49,35.49,0,0,1-48.8,11.09L387.67,563a35.49,35.49,0,0,1-11.09-48.8h0a35.49,35.49,0,0,1,48.8-11.09l43.07,31.42A35.49,35.49,0,0,1,479.55,583.27Z" transform="translate(-239 -72.21)" fill="#be7c5e"/><path d="M497.9,481h0a35.49,35.49,0,0,1-48.8,11.09l-70.16-45.4a35.49,35.49,0,0,1-11.09-48.8h0a35.49,35.49,0,0,1,48.8-11.09l70.16,45.4A35.49,35.49,0,0,1,497.9,481Z" transform="translate(-239 -72.21)" fill="#be7c5e"/><path d="M521.28,382h0a37.9,37.9,0,0,1-52.11,11.84l-94.5-61.53a37.9,37.9,0,0,1-11.84-52.11h0a37.9,37.9,0,0,1,52.11-11.84l94.5,61.53A37.9,37.9,0,0,1,521.28,382Z" transform="translate(-239 -72.21)" fill="url(#ad7c6dc9-0e1b-446d-83eb-be41b53bfd0d)"/><path d="M516.26,378.8h0a35.49,35.49,0,0,1-48.8,11.09l-88.51-57.63a35.49,35.49,0,0,1-11.09-48.8h0a35.49,35.49,0,0,1,48.8-11.09L505.16,330A35.49,35.49,0,0,1,516.26,378.8Z" transform="translate(-239 -72.21)" fill="#be7c5e"/></svg>
    )
  }