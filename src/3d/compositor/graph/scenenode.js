/**
 * @export{class} SceneNode
 */
define( function( require ){

    var Node = require("./node");
    var Pass = require("../pass");
    var FrameBuffer = require("../../framebuffer");
    var texturePool = require("./texturepool");

    var SceneNode = Node.derive( function(){
        return {
            scene : null,
            camera : null,
            material : null
        }
    }, function(){
        if(this.frameBuffer){
            this.frameBuffer.depthBuffer = true;
        }
    }, {
        render : function( renderer ){

            if( ! this.outputs){
                renderer.render( this.scene, this.camera );
            }else{
                
                var frameBuffer = this.frameBuffer;

                for( var name in this.outputs){
                    var outputInfo = this.outputs[name];
                    var texture = texturePool.get( outputInfo.parameters );
                    this._textures[name] = texture;

                    var attachment = outputInfo.attachment || _gl.COLOR_ATTACHMENT0;
                    if(typeof(attachment) == "string"){
                        attachment = _gl[attachment];
                    }
                    frameBuffer.attach( renderer.gl, texture, attachment);
                }
                frameBuffer.bind( renderer );

                if( this.material ){
                    this.scene.material = this.material;
                }
                renderer.render( this.scene, this.camera );
                this.scene.material = null;

                frameBuffer.unbind( renderer );
            }
        }
    })

    return SceneNode;
} )