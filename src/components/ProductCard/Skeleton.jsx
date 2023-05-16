import React from 'react'
import ContentLoader from "react-content-loader"
function Skeleton() {
  return (
    <ContentLoader 
      speed={0}
      width={165}
      height={240}
      viewBox="0 0 160 240"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="574" cy="223" r="20" /> 
      <rect x="0" y="0" rx="18" ry="18" width="165" height="135" /> 
      <rect x="0" y="210" rx="9" ry="9" width="82" height="28" /> 
      <rect x="124" y="210" rx="10" ry="10" width="35" height="27" /> 
      <rect x="0" y="143" rx="7" ry="7" width="160" height="17" /> 
      <rect x="0" y="167" rx="7" ry="7" width="110" height="14" />
    </ContentLoader>
  )
}

export default Skeleton