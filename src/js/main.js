import '../css/style.css'
import {Terrain} from "./class/Terrain.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const terrain = new Terrain(ctx, 30, 30);
terrain.DrawTerrain();