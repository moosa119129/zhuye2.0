"use client";

import React, { useState, useMemo } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Plus,
    Trash2,
    CheckCircle2,
    Circle,
    Sparkles,
    BrainCircuit,
    LayoutDashboard,
    List as ListIcon,
    PlusCircle,
    TrendingUp,
    Zap
} from 'lucide-react';
import { Task, QuadrantType } from '@/lib/roi-focus/types';
import { QUADRANT_CONFIGS, INITIAL_TASKS } from '@/lib/roi-focus/constants';
import { analyzePortfolio } from '@/lib/roi-focus/geminiService';

export function ROIDashboard() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [viewMode, setViewMode] = useState<'List' | 'Kanban'>('Kanban');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskQuadrant, setNewTaskQuadrant] = useState<QuadrantType>(QuadrantType.CORE);
    const [newTaskDuration, setNewTaskDuration] = useState(1);
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0);

    const stats = useMemo(() => {
        const data: Record<QuadrantType, number> = {
            [QuadrantType.CORE]: 0,
            [QuadrantType.LEVERAGE]: 0,
            [QuadrantType.ALIGNMENT]: 0,
            [QuadrantType.MAINTENANCE]: 0,
        };
        tasks.forEach(t => {
            data[t.quadrant] += t.duration;
        });
        return data;
    }, [tasks]);

    const coreAndLeverageDuration = stats[QuadrantType.CORE] + stats[QuadrantType.LEVERAGE];
    const coreRatio = totalDuration > 0 ? coreAndLeverageDuration / totalDuration : 0;
    const isProfitable = coreRatio >= 0.6;

    const chartData = Object.values(QuadrantType).map(type => ({
        name: QUADRANT_CONFIGS[type].label.split(' ')[0],
        value: stats[type]
    }));

    const COLORS = ['#FF4E88', '#00F0FF', '#FFB800', '#F0F0F0']; // Neo-Pop palette

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            quadrant: newTaskQuadrant,
            duration: Number(newTaskDuration),
            status: 'Todo',
            roiRating: 'Mid'
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
        setAiAnalysis(null);
    };

    const toggleStatus = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
        setAiAnalysis(null);
    };

    const handleAIAnalysis = async () => {
        setIsAnalyzing(true);
        const result = await analyzePortfolio(tasks, coreRatio);
        setAiAnalysis(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="space-y-8">
            {/* 1. Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className={`p-6 border-[3px] border-charcoal shadow-pop-sm ${isProfitable ? 'bg-pop-green' : 'bg-pop-pink'} flex flex-col justify-between`}>
                    <span className="font-black text-xs uppercase text-charcoal opacity-70">Daily Pulse</span>
                    <h4 className="text-3xl font-black text-charcoal mt-2">{isProfitable ? "盈利" : "亏损"}</h4>
                    <p className="text-[10px] font-bold text-charcoal mt-2 italic">ROI: {(coreRatio * 100).toFixed(0)}%</p>
                </div>
                <div className="p-6 border-[3px] border-charcoal shadow-pop-sm bg-white flex flex-col justify-between">
                    <span className="font-black text-xs uppercase text-charcoal opacity-70">Total Hours</span>
                    <h4 className="text-3xl font-black text-charcoal mt-2">{totalDuration}h</h4>
                    <p className="text-[10px] font-bold text-charcoal-light mt-2 italic">Investment</p>
                </div>
                <div className="p-6 border-[3px] border-charcoal shadow-pop-sm bg-pop-cyan flex flex-col justify-between">
                    <span className="font-black text-xs uppercase text-charcoal opacity-70">Core Assets</span>
                    <h4 className="text-3xl font-black text-charcoal mt-2">{stats[QuadrantType.CORE]}h</h4>
                    <p className="text-[10px] font-bold text-charcoal mt-2 italic">High Growth</p>
                </div>
                <div className="p-6 border-[3px] border-charcoal shadow-pop-sm bg-white flex flex-col justify-between">
                    <span className="font-black text-xs uppercase text-charcoal opacity-70">Operational</span>
                    <h4 className="text-3xl font-black text-charcoal mt-2">{stats[QuadrantType.MAINTENANCE]}h</h4>
                    <p className="text-[10px] font-bold text-charcoal-light mt-2 italic">Keep &lt; 20%</p>
                </div>
            </div>

            {/* 2. Portfolio Analysis & Add Task */}
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Allocation Chart */}
                <div className="bg-white border-[3px] border-charcoal shadow-pop-md p-6 flex flex-col items-center">
                    <h3 className="text-xl font-black text-charcoal w-full mb-6 border-b-[3px] border-charcoal pb-2 italic uppercase">Portfolio</h3>
                    <div className="w-full h-56 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={85}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="#000"
                                    strokeWidth={3}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#000',
                                        border: 'none',
                                        borderRadius: '0px',
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <TrendingUp size={32} className="text-charcoal opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Add Task Box */}
                <div className="lg:col-span-2 bg-white border-[3px] border-charcoal shadow-pop-md p-8">
                    <h3 className="text-xl font-black text-charcoal mb-8 italic uppercase flex items-center gap-2">
                        <PlusCircle /> 新增投资标的
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-charcoal-light mb-1 uppercase">Asset Name</label>
                                <input
                                    type="text"
                                    placeholder="输入任务名称..."
                                    className="w-full border-[3px] border-charcoal p-3 font-black focus:bg-pop-yellow outline-none transition-colors"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-charcoal-light mb-1 uppercase">Quadrant</label>
                                    <select
                                        className="w-full border-[3px] border-charcoal p-3 font-black bg-white focus:bg-pop-cyan outline-none transition-colors"
                                        value={newTaskQuadrant}
                                        onChange={(e) => setNewTaskQuadrant(e.target.value as QuadrantType)}
                                    >
                                        {Object.values(QUADRANT_CONFIGS).map(q => (
                                            <option key={q.id} value={q.id}>{q.label.split(' ')[0]}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-charcoal-light mb-1 uppercase">Hours</label>
                                    <input
                                        type="number"
                                        className="w-full border-[3px] border-charcoal p-3 font-black focus:bg-pop-green outline-none"
                                        value={newTaskDuration}
                                        onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                                        min="0.1"
                                        step="0.5"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="bg-neutral-100 border-[3px] border-charcoal p-4 text-xs font-bold leading-relaxed">
                                <span className="text-pop-pink uppercase">Strategy:</span><br />
                                {QUADRANT_CONFIGS[newTaskQuadrant].strategy}
                            </div>
                            <button
                                onClick={addTask}
                                className="mt-4 bg-charcoal text-white h-14 font-black flex items-center justify-center gap-2 shadow-pop-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                <Plus size={24} /> ADD ASSET
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Kanban / List View */}
            <div className="bg-white border-[3px] border-charcoal shadow-pop-md overflow-hidden">
                <div className="p-4 bg-charcoal flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex bg-white/20 p-1 border border-white/30">
                        <button
                            onClick={() => setViewMode('Kanban')}
                            className={`px-4 py-1 text-xs font-black transition-all ${viewMode === 'Kanban' ? 'bg-pop-yellow text-charcoal' : 'text-white hover:bg-white/10'}`}
                        >
                            KANBAN
                        </button>
                        <button
                            onClick={() => setViewMode('List')}
                            className={`px-4 py-1 text-xs font-black transition-all ${viewMode === 'List' ? 'bg-pop-cyan text-charcoal' : 'text-white hover:bg-white/10'}`}
                        >
                            TABLE
                        </button>
                    </div>

                    <button
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 text-sm font-black text-charcoal bg-pop-pink px-4 py-2 shadow-pop-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
                    >
                        <Zap size={18} fill="currentColor" />
                        {isAnalyzing ? '分析中...' : 'AI 顾问点评'}
                    </button>
                </div>

                {/* AI Text results */}
                {aiAnalysis && (
                    <div className="p-8 bg-pop-pink border-b-[3px] border-charcoal text-charcoal">
                        <h4 className="font-black text-2xl mb-4 italic flex items-center gap-4">
                            <Sparkles /> INSIGHTS <Sparkles />
                        </h4>
                        <div className="prose prose-invert prose-sm max-w-none text-charcoal font-bold leading-relaxed whitespace-pre-line">
                            {aiAnalysis}
                        </div>
                    </div>
                )}

                <div className="p-8 overflow-x-auto min-h-[400px]">
                    {viewMode === 'Kanban' ? (
                        <div className="flex gap-6 min-w-[1000px]">
                            {Object.values(QUADRANT_CONFIGS).map(config => (
                                <div key={config.id} className="flex-1 min-w-[200px] flex flex-col bg-neutral-50 border-[3px] border-charcoal p-4 shadow-pop-sm">
                                    <div className={`mb-4 pb-2 border-b-[3px] border-charcoal flex justify-between items-center`}>
                                        <span className={`font-black uppercase text-xs tracking-widest`}>{config.label.split(' ')[0]}</span>
                                        <div className="bg-charcoal text-white px-2 py-0.5 text-[10px] font-black">
                                            {tasks.filter(t => t.quadrant === config.id).reduce((acc, curr) => acc + curr.duration, 0)}H
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {tasks.filter(t => t.quadrant === config.id).map(task => (
                                            <div key={task.id} className="bg-white border-[3px] border-charcoal p-4 shadow-pop-sm group">
                                                <div className="flex justify-between mb-4">
                                                    <button onClick={() => toggleStatus(task.id)}>
                                                        {task.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-pop-green" /> : <Circle className="w-5 h-5 text-neutral-300" />}
                                                    </button>
                                                    <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-pop-pink transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className={`font-black text-lg leading-tight mb-4 ${task.status === 'Done' ? 'line-through opacity-30 italic' : 'text-charcoal'}`}>
                                                    {task.title}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="bg-neutral-100 border-[2px] border-charcoal px-2 py-0.5 text-[10px] font-black">{task.duration}H</span>
                                                    <span className={`text-[10px] font-black ${task.roiRating === 'High' ? 'text-pop-green' : 'text-charcoal-light'}`}>ROI: {task.roiRating}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table className="w-full border-collapse border-[3px] border-charcoal">
                            <thead className="bg-neutral-100 border-b-[3px] border-charcoal">
                                <tr>
                                    <th className="px-4 py-4 text-left font-black uppercase text-xs">Status</th>
                                    <th className="px-4 py-4 text-left font-black uppercase text-xs">Asset Name</th>
                                    <th className="px-4 py-4 text-left font-black uppercase text-xs">Quadrant</th>
                                    <th className="px-4 py-4 text-left font-black uppercase text-xs">Duration</th>
                                    <th className="px-4 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.id} className="border-b-[2px] border-neutral-100 hover:bg-neutral-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <button onClick={() => toggleStatus(task.id)}>
                                                {task.status === 'Done' ? <CheckCircle2 className="w-6 h-6 text-pop-green" /> : <Circle className="w-6 h-6 text-neutral-200 hover:text-charcoal" />}
                                            </button>
                                        </td>
                                        <td className={`px-4 py-4 font-black text-lg ${task.status === 'Done' ? 'line-through opacity-30 italic' : 'text-charcoal'}`}>
                                            {task.title}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="font-bold text-xs bg-pop-cyan/20 border border-pop-cyan text-charcoal px-3 py-1 rounded-full uppercase italic">
                                                {task.quadrant}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 font-black">{task.duration}h</td>
                                        <td className="px-4 py-4 text-right">
                                            <button onClick={() => deleteTask(task.id)} className="text-neutral-300 hover:text-pop-pink transition-colors">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
