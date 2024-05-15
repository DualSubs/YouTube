export default function setCaptions(captions, translationLanguages) {
    console.log(`☑️ Set Captions`);
    // 有播放器字幕列表渲染器
    if (captions?.playerCaptionsTracklistRenderer) {
        console.log(`⚠ Tracklist`);
        if (captions?.playerCaptionsTracklistRenderer?.captionTracks) {
            // 改字幕可用性
            captions.playerCaptionsTracklistRenderer.captionTracks = captions?.playerCaptionsTracklistRenderer.captionTracks.map(caption => {
                caption.isTranslatable = true;
                return caption;
            });
        };
        if (captions?.playerCaptionsTracklistRenderer?.audioTracks) {
            // 改音轨可用性
            captions.playerCaptionsTracklistRenderer.audioTracks = captions?.playerCaptionsTracklistRenderer.audioTracks.map(audio => {
                audio.visibility = 2 //"ON";
                audio.hasDefaultTrack = true;
                audio.captionsInitialState = 3 //"CAPTIONS_INITIAL_STATE_ON_RECOMMENDED";
                return audio;
            });
        };
        // 增加自动翻译可用语言
        switch (HOST) {
            case "www.youtube.com":
            case "tv.youtube.com":
            default:
                captions.playerCaptionsTracklistRenderer.translationLanguages = translationLanguages.DESKTOP;
                break;
            case "m.youtube.com":
            case "youtubei.googleapis.com":
                captions.playerCaptionsTracklistRenderer.translationLanguages = translationLanguages.MOBILE;
                break;
        };
        // 改默认字幕索引值，来指定“源语言”，从而启用“自动翻译”
        if (!captions?.playerCaptionsTracklistRenderer?.defaultCaptionTrackIndex) {
            captions.playerCaptionsTracklistRenderer.defaultCaptionTrackIndex = 0;
        };
    };
    console.log(`✅ Set Captions, `);
    return captions;
};
