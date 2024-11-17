import * as THREE from 'three';

const vertexShader = `
    attribute float scale;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = scale * ( 5000.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
    }
`;
// gl_PointSize = scale * ( 300.0 / - mvPosition.z );
// gl_PointSize = scale * ( 3.0 );

const fragmentShader = `
    uniform vec3 color;
    void main() {
            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
            gl_FragColor = vec4( color, 1.0 );
    }
`;

export const pointShaderMaterial = {
  uniforms: {
    color: { value: new THREE.Color(0xcccccc) },
    size: { value: 10 },
  },
  vertexShader,
  fragmentShader,
  transparent: true,
};
