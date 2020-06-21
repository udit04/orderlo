import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = props => {
  let height, width
  switch (props.screen) {
    case 'mobile': {
      height = '100'
      width = '400'
      break
    }
    case 'desktop': {
      height = '100'
      width = '1060'
      break
    }
    case 'large-screen': {
      height = '150'
      width = '1920'
      break
    }
    default: {
      height = '100'
      width = '1060'
      break
    }
  }
  return (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      width={width}
      speed={2}
      {...props}
    >
      {props.imageType === 'circle' ? (
        <circle cx="60" cy="45" r="30" />
      ) : (
        <rect x="20" y="20" rx="5" ry="5" width="64" height="63" />
      )}
      <rect x="105" y="20" rx="5" ry="5" width="250" height="12" />
      <rect x="105" y="40" rx="5" ry="5" width="180" height="12" />
      <rect x="105" y="60" rx="5" ry="5" width="125" height="12" />
    </ContentLoader>
  )
}

const SkeletonLoader = props => (
  <React.Fragment>
    {Array(5)
      .fill('')
      .map((e, i) => (
        <Loader
          screen={props.screen}
          key={i}
          style={{ opacity: Number(2 / i).toFixed(1) }}
          {...props}
        />
      ))}
  </React.Fragment>
)


export default SkeletonLoader