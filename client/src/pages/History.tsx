import type React from 'react';
import { useState } from 'react';
import { useContents } from '../hooks/useContents';
import type { Content } from '../types';
import {
  Star,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Inbox,
  Loader2,
  Calendar,
  Layers,
  FileText,
  MessageSquare,
  Bookmark,
  Mail,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export const History: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const { contentsQuery, deleteContent, toggleFavorite } = useContents(page, 9);
  const { data, isLoading, error } = contentsQuery;

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card expansion when clicking delete
    if (window.confirm('Are you sure you want to delete this saved content?')) {
      try {
        await deleteContent(id);
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete content.');
      }
    }
  };

  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card expansion when clicking favorite
    try {
      await toggleFavorite(id);
    } catch (err) {
      console.error('Favorite toggle failed:', err);
    }
  };

  // Helper to get type specific visual styles & icon
  const getTypeMeta = (type: Content['type']) => {
    switch (type) {
      case 'blog':
        return {
          label: 'Blog Post',
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/25',
          icon: FileText,
        };
      case 'caption':
        return {
          label: 'Social Caption',
          color: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
          icon: MessageSquare,
        };
      case 'description':
        return {
          label: 'Product Desc',
          color: 'text-green-400 bg-green-500/10 border-green-500/25',
          icon: Bookmark,
        };
      case 'newsletter':
        return {
          label: 'Newsletter',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
          icon: Mail,
        };
    }
  };

  // Handle client-side content-type filtering
  const filteredContents =
    data?.contents.filter((content) => {
      if (filterType === 'all') return true;
      return content.type === filterType;
    }) || [];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden font-sans select-none">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex-1 flex flex-col">
        {/* Page Title & Filter Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
              <Layers className="w-8 h-8 text-purple-500 shrink-0" />
              Generation History
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Access and manage your generated content library
            </p>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              htmlFor="type-filter"
              className="text-xs font-semibold text-slate-400 tracking-wider uppercase shrink-0"
            >
              Filter:
            </label>
            <div className="relative w-full sm:w-48">
              <select
                id="type-filter"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setPage(1); // Reset page on filter change
                }}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-3 py-2 text-sm text-white outline-none cursor-pointer appearance-none transition"
              >
                <option value="all">All Content</option>
                <option value="blog">Blog Posts</option>
                <option value="caption">Social Captions</option>
                <option value="description">Product Descriptions</option>
                <option value="newsletter">Newsletters</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mb-4" />
            <h3 className="font-semibold text-slate-200">
              Loading your history...
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Retrieving generated copies from database.
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-red-400">
            <Inbox className="w-12 h-12 mb-4" />
            <h3 className="font-semibold">Failed to fetch content</h3>
            <p className="text-xs text-red-500 mt-1">
              Please try refreshing the page or check connection.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredContents.length === 0 && (
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xl">
            <div className="w-12 h-12 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center text-slate-600 mx-auto mb-4">
              <Inbox className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">
              No content found
            </h3>
            <p className="text-slate-500 text-sm mt-1 mb-6 leading-relaxed">
              {filterType === 'all'
                ? "You haven't generated or saved any content copies yet. Configure the generator to get started."
                : `You haven't saved any content under the "${filterType}" category.`}
            </p>
            {filterType !== 'all' && (
              <button
                onClick={() => setFilterType('all')}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer select-none"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Content Cards Grid */}
        {!isLoading && !error && filteredContents.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map((content) => {
                const meta = getTypeMeta(content.type);
                const Icon = meta.icon;
                const isExpanded = !!expandedIds[content._id];
                const dateStr = new Date(content.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }
                );

                return (
                  <div
                    key={content._id}
                    onClick={() => toggleExpand(content._id)}
                    className={`bg-slate-900/40 backdrop-blur-xl border rounded-2xl p-5 hover:border-slate-700/85 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none group ${
                      isExpanded
                        ? 'border-purple-500/40 shadow-purple-500/5 col-span-1 md:col-span-2 lg:col-span-3'
                        : 'border-slate-800/80 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div>
                      {/* Header: badge + favorite + delete */}
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border ${meta.color}`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          {meta.label}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Favorite button */}
                          <button
                            onClick={(e) =>
                              handleToggleFavorite(content._id, e)
                            }
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800/40 transition select-none cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 shrink-0 transition-transform active:scale-125 ${
                                content.isFavorite
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-400'
                              }`}
                            />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={(e) => handleDelete(content._id, e)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-850 transition select-none cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 shrink-0" />
                          </button>
                        </div>
                      </div>

                      {/* Topic Description */}
                      <h3 className="font-bold text-slate-100 text-base leading-snug mb-1 select-text">
                        {content.topic}
                      </h3>

                      {/* Meta info: tone + date */}
                      <div className="flex flex-wrap gap-4 items-center text-xs text-slate-500 mb-4 select-text">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          Tone: {content.tone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          {dateStr}
                        </span>
                      </div>

                      {/* Generated text preview / full */}
                      <div className="mt-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/40 overflow-hidden relative select-text">
                        <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 font-sans text-xs outline-none max-h-[500px] overflow-y-auto">
                          {isExpanded
                            ? content.generatedText
                            : content.generatedText.length > 150
                              ? `${content.generatedText.slice(0, 150)}...`
                              : content.generatedText}
                        </pre>
                      </div>
                    </div>

                    {/* Expand/Collapse Trigger */}
                    <div className="mt-4 pt-3 border-t border-slate-800/40 flex justify-between items-center text-xs text-slate-400 group-hover:text-slate-300">
                      <span>
                        {isExpanded
                          ? 'Click card to collapse'
                          : 'Click card to expand'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 shrink-0 transition" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0 transition" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {data && data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 rounded-xl text-xs font-semibold text-slate-300 transition cursor-pointer select-none disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </button>
                <span className="text-xs text-slate-400 font-medium">
                  Page {page} of {data.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, data.totalPages))
                  }
                  disabled={page === data.totalPages}
                  className="flex items-center gap-1 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 rounded-xl text-xs font-semibold text-slate-300 transition cursor-pointer select-none disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
