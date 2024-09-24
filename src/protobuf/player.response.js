// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_number,output_javascript
// @generated from protobuf file "player.response.proto" (syntax proto3)
// tslint:disable
// @generated by protobuf-ts 2.9.4 with parameter generate_dependencies,long_type_number,output_javascript
// @generated from protobuf file "player.response.proto" (syntax proto3)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
// @generated message type with reflection information, may provide speed optimized methods
class PlayerResponse$Type extends MessageType {
    constructor() {
        super("PlayerResponse", [
            { no: 10, name: "captions", kind: "message", T: () => Captions }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message PlayerResponse
 */
export const PlayerResponse = new PlayerResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Captions$Type extends MessageType {
    constructor() {
        super("Captions", [
            { no: 51621377, name: "playerCaptionsTracklistRenderer", kind: "message", T: () => PlayerCaptionsTracklistRenderer }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Captions
 */
export const Captions = new Captions$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PlayerCaptionsTracklistRenderer$Type extends MessageType {
    constructor() {
        super("PlayerCaptionsTracklistRenderer", [
            { no: 1, name: "captionTracks", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => CaptionTracks },
            { no: 2, name: "audioTracks", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => AudioTracks },
            { no: 3, name: "translationLanguages", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => TranslationLanguages },
            { no: 4, name: "defaultAudioTrackIndex", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "defaultCaptionTrackIndex", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message PlayerCaptionsTracklistRenderer
 */
export const PlayerCaptionsTracklistRenderer = new PlayerCaptionsTracklistRenderer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CaptionTracks$Type extends MessageType {
    constructor() {
        super("CaptionTracks", [
            { no: 1, name: "baseUrl", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "message", T: () => Name },
            { no: 3, name: "vssId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "languageCode", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "kind", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "rtl", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "isTranslatable", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message CaptionTracks
 */
export const CaptionTracks = new CaptionTracks$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AudioTracks$Type extends MessageType {
    constructor() {
        super("AudioTracks", [
            { no: 2, name: "captionTrackIndices", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "defaultCaptionTrackIndex", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "forcedCaptionTrackIndex", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "visibility", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "hasDefaultTrack", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "hasForcedTrack", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "audioTrackId", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "captionsInitialState", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message AudioTracks
 */
export const AudioTracks = new AudioTracks$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TranslationLanguages$Type extends MessageType {
    constructor() {
        super("TranslationLanguages", [
            { no: 1, name: "languageCode", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "languageName", kind: "message", T: () => Name }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message TranslationLanguages
 */
export const TranslationLanguages = new TranslationLanguages$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Name$Type extends MessageType {
    constructor() {
        super("Name", [
            { no: 1, name: "runs", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Runs }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Name
 */
export const Name = new Name$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Runs$Type extends MessageType {
    constructor() {
        super("Runs", [
            { no: 1, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Runs
 */
export const Runs = new Runs$Type();
