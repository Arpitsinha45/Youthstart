import React, { useEffect, useState } from 'react';
import { Check, X, Eye, Loader2 } from 'lucide-react';
import { getSubmissions, updateSubmissionStatus, approveSubmission } from '../../lib/adminApi';
import { Submission } from '../../types';

export const SubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data.filter(s => s.status === 'pending'));
    } catch (error) {
      console.error("Failed to fetch submissions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission: Submission) => {
    if (!confirm(`Approve ${submission.startupName} and add to Startups?`)) return;
    
    setProcessingId(submission.id);
    try {
      await approveSubmission(submission);
      setSubmissions(prev => prev.filter(s => s.id !== submission.id));
    } catch (error) {
      console.error("Failed to approve submission", error);
      alert("Failed to approve submission");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Reject this submission?")) return;
    
    setProcessingId(id);
    try {
      await updateSubmissionStatus(id, 'rejected');
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error("Failed to reject submission", error);
      alert("Failed to reject submission");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div className="text-white">Loading submissions...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold serif-title mb-2">Startup Submissions</h1>
        <p className="text-gray-400">Review and approve startup submissions.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-gray-400">No pending submissions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-grow space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{submission.startupName}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded">{submission.category}</span>
                </div>
                
                <p className="text-gray-300 text-sm">{submission.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="block uppercase tracking-widest mb-1">Founder</span>
                    <span className="text-white">{submission.founderName}</span>
                  </div>
                  <div>
                    <span className="block uppercase tracking-widest mb-1">Email</span>
                    <span className="text-white">{submission.email}</span>
                  </div>
                  <div>
                    <span className="block uppercase tracking-widest mb-1">Website</span>
                    <a href={submission.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline truncate block">
                      {submission.website}
                    </a>
                  </div>
                  <div>
                    <span className="block uppercase tracking-widest mb-1">Submitted</span>
                    <span className="text-white">{new Date(submission.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 justify-center min-w-[120px]">
                <button 
                  onClick={() => handleApprove(submission)}
                  disabled={processingId === submission.id}
                  className="flex-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-lg py-2 px-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors disabled:opacity-50"
                >
                  {processingId === submission.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Approve
                </button>
                <button 
                  onClick={() => handleReject(submission.id)}
                  disabled={processingId === submission.id}
                  className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg py-2 px-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors disabled:opacity-50"
                >
                  {processingId === submission.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
