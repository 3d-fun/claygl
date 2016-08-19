define(function () {
return "vec3 calcAmbientSHLight(int idx, vec3 N) {\n    int offset = 9 * idx;\n    return ambientSHLightCoefficients[offset + 0]\n        + ambientSHLightCoefficients[offset + 1] * N.x\n        + ambientSHLightCoefficients[offset + 2] * N.y\n        + ambientSHLightCoefficients[offset + 3] * N.z\n        + ambientSHLightCoefficients[offset + 4] * N.x * N.z\n        + ambientSHLightCoefficients[offset + 5] * N.z * N.y\n        + ambientSHLightCoefficients[offset + 6] * N.y * N.x\n        + ambientSHLightCoefficients[offset + 7] * (3.0 * N.z * N.z - 1.0)\n        + ambientSHLightCoefficients[offset + 8] * (N.x * N.x - N.y * N.y);\n}";
});