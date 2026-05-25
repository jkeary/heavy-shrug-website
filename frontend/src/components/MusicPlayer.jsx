import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import TRACKS from "../tracks.json";

const R2 = "https://pub-b5791c1a23e74bb79d28eb8015d10d18.r2.dev";
const toSrc = (file) => `${R2}/music/${encodeURIComponent(file)}`;
const toArt = (art) => (art ? `${R2}/artwork/${encodeURIComponent(art)}` : null);

const fmt = (secs) => {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [artExpanded, setArtExpanded] = useState(false);
  const audioRef = useRef(null);

  const track = TRACKS[index];

  // Load new track whenever index changes; resume if already playing
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (isPlaying) a.play().catch(() => {});
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextTrack = useCallback(() => {
    setIndex((i) => {
      if (shuffle) {
        let n;
        do {
          n = Math.floor(Math.random() * TRACKS.length);
        } while (n === i && TRACKS.length > 1);
        return n;
      }
      return (i + 1) % TRACKS.length;
    });
  }, [shuffle]);

  const prevTrack = () => {
    const a = audioRef.current;
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const selectTrack = (i) => {
    setIndex(i);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
  };

  return (
    <PlayerShell $open={isOpen}>
      {/* Audio element lives outside PlayerBody so it never unmounts */}
      <audio
        ref={audioRef}
        src={toSrc(track.file)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <PlayerHeader $open={isOpen}>
        {isOpen && <Title>Sick Tunes!</Title>}
        <ToggleButton
          type="button"
          aria-label={isOpen ? "Collapse player" : "Open player"}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? "−" : "+"}
        </ToggleButton>
      </PlayerHeader>

      <PlayerBody $open={isOpen}>
        {artExpanded && track.art && (
          <ArtworkPanel>
            <ArtworkFrame onClick={() => setArtExpanded(false)}>
              <ArtworkBig src={toArt(track.art)} alt={track.album} />
              <ArtChevron>▼</ArtChevron>
            </ArtworkFrame>
          </ArtworkPanel>
        )}

        <NowPlaying>
          {!artExpanded && track.art && (
            <ArtworkThumbWrap onClick={() => setArtExpanded(true)}>
              <ArtworkThumb src={toArt(track.art)} alt={track.album} />
              <ArtChevronSmall>▲</ArtChevronSmall>
            </ArtworkThumbWrap>
          )}
          <NowText>
            <NowTitle>{track.title}</NowTitle>
            <NowMeta>
              {track.album} · {track.year}
            </NowMeta>
          </NowText>
        </NowPlaying>

        <ProgressWrap>
          <Progress
            type="range"
            min="0"
            max={duration || 0}
            step="0.5"
            value={currentTime}
            onChange={handleSeek}
          />
          <Times>
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </Times>
        </ProgressWrap>

        <Controls>
          <CtrlBtn onClick={prevTrack} title="Previous">
            ⏮
          </CtrlBtn>
          <PlayBtn onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</PlayBtn>
          <CtrlBtn onClick={nextTrack} title="Next">
            ⏭
          </CtrlBtn>
          <ShuffleBtn
            $active={shuffle}
            onClick={() => setShuffle((v) => !v)}
            title="Shuffle"
          >
            ⇌
          </ShuffleBtn>
        </Controls>

        <TrackList>
          {TRACKS.map((t, i) => {
            if (artExpanded) return null;
            return (
              <TrackRow
                key={t.file}
                $active={i === index}
                onClick={() => selectTrack(i)}
              >
                <TrackIndicator>
                  {i === index && isPlaying ? "▶" : i + 1}
                </TrackIndicator>
                <TrackInfo>
                  <TrackTitle $active={i === index}>{t.title}</TrackTitle>
                  <TrackAlbum>{t.album}</TrackAlbum>
                </TrackInfo>
              </TrackRow>
            );
          })}
        </TrackList>
      </PlayerBody>
    </PlayerShell>
  );
}

/* ─── Shell (unchanged) ─── */

const PlayerShell = styled.aside`
  position: fixed;
  bottom: 3.5rem;
  left: 1.25rem;
  z-index: 1000;
  width: ${({ $open }) => ($open ? "380px" : "72px")};
  max-width: calc(100vw - 1.5rem);
  background: rgba(8, 12, 5, 0.97);
  border: 2px solid var(--orange);
  border-radius: 22px;
  box-shadow: 0 22px 80px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  transition: width 0.25s ease;
  color: #f5f0e8;

  @media (max-width: 640px) {
    left: 0.75rem;
    bottom: 0.75rem;
    width: ${({ $open }) => ($open ? "calc(100vw - 1.5rem)" : "72px")};
  }
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? "space-between" : "center")};
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: rgba(0, 0, 0, 0.55);
  border-bottom: ${({ $open }) =>
    $open ? "1px solid rgba(255,107,0,0.2)" : "none"};
`;

const Title = styled.div`
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--orange);
`;

const ToggleButton = styled.button`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--orange);
  color: #0d1a07;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const PlayerBody = styled.div`
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  height: ${({ $open }) => ($open ? "auto" : "0")};
  overflow: hidden;
`;

/* ─── Now playing ─── */

const ArtworkPanel = styled.div`
  background: #000;
  padding: 16px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 107, 0, 0.12);
`;

const ArtworkFrame = styled.div`
  position: relative;
  cursor: pointer;
  width: 80%;
`;

const ArtworkBig = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 6px;
`;

const ArtChevron = styled.span`
  position: absolute;
  bottom: 7px;
  right: 7px;
  background: rgba(0, 0, 0, 0.65);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.6rem;
  padding: 5px 5px;
  border-radius: 4px;
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

const NowPlaying = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem 0.6rem;
  border-bottom: 1px solid rgba(255, 107, 0, 0.12);
`;

const ArtworkThumbWrap = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 107, 0, 0.3);
`;

const ArtworkThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ArtChevronSmall = styled.span`
  position: absolute;
  bottom: 3px;
  right: 3px;
  background: rgba(0, 0, 0, 0.65);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.5rem;
  padding: 2px 3px;
  border-radius: 3px;
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

const NowText = styled.div`
  overflow: hidden;
  flex: 1;
`;

const NowTitle = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--orange);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NowMeta = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  color: rgba(245, 240, 232, 0.5);
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ─── Progress ─── */

const ProgressWrap = styled.div`
  padding: 0.6rem 1rem 0.2rem;
`;

const Progress = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    to right,
    var(--orange) ${({ value, max }) => (max ? (value / max) * 100 : 0)}%,
    rgba(255, 255, 255, 0.15) 0%
  );
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--orange);
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--orange);
    border: none;
    cursor: pointer;
  }
`;

const Times = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.68rem;
  color: rgba(245, 240, 232, 0.45);
  margin-top: 0.25rem;
`;

/* ─── Controls ─── */

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.6rem;
  border-bottom: 1px solid rgba(255, 107, 0, 0.12);
`;

const CtrlBtn = styled.button`
  background: none;
  border: none;
  color: #f5f0e8;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  transition:
    color 0.15s,
    background 0.15s;
  &:hover {
    color: var(--orange);
    background: rgba(255, 107, 0, 0.1);
  }
`;

const PlayBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid var(--orange);
  background: var(--orange);
  color: #0d1a07;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    transform 0.15s;
  &:hover {
    background: var(--orange-dark);
    transform: scale(1.08);
  }
`;

const ShuffleBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  color: ${({ $active }) =>
    $active ? "var(--orange)" : "rgba(245,240,232,0.4)"};
  transition:
    color 0.15s,
    background 0.15s;
  &:hover {
    background: rgba(255, 107, 0, 0.1);
  }
`;

/* ─── Track list ─── */

const TrackList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--orange) transparent;
`;

const TrackRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "rgba(255,107,0,0.1)" : "transparent"};
  border-left: 3px solid
    ${({ $active }) => ($active ? "var(--orange)" : "transparent")};
  transition: background 0.15s;
  &:hover {
    background: rgba(255, 107, 0, 0.07);
  }
`;

const TrackIndicator = styled.span`
  font-size: 0.7rem;
  color: rgba(245, 240, 232, 0.35);
  width: 16px;
  text-align: center;
  flex-shrink: 0;
`;

const TrackInfo = styled.div`
  overflow: hidden;
`;

const TrackTitle = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  color: ${({ $active }) => ($active ? "var(--orange)" : "#F5F0E8")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackAlbum = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.65rem;
  color: rgba(245, 240, 232, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
